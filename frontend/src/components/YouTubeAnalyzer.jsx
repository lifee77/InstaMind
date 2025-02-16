"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Loader2, TrendingUp, PlaySquare, Video } from "lucide-react"
import styles from "./YouTubeAnalyzer.module.css"

const YouTubeAnalyzer = () => {
  const [channelId, setChannelId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  // Validate YouTube Channel ID
  const isValidChannelId = (id) => {
    // YouTube channel IDs are typically 24 characters
    // They can start with UC or HC
    const pattern = /^(UC|HC)[a-zA-Z0-9_-]{22}$/
    return pattern.test(id)
  }

  const handleAnalyze = async () => {
    // Clean the input by removing any whitespace
    const cleanChannelId = channelId.trim()

    // Validate Channel ID before making the request
    if (!isValidChannelId(cleanChannelId)) {
      setError("Please enter a valid YouTube channel ID (starts with UC or HC, 24 characters long)")
      return
    }

    setIsLoading(true)
    setError(null)
    setAnalysis(null)
  
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelId: cleanChannelId }),
      })
  
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(
          `Failed to analyze channel: ${
            errorData || `HTTP error! status: ${response.status}`
          }`
        )
      }
  
      try {
        const data = await response.json()
        
        // Validate response data structure
        if (!data || !data.recentVideos || !data.trends || !data.suggestions) {
          throw new Error("Invalid response format from server")
        }
        
        setAnalysis(data)
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError)
        throw new Error('Failed to parse server response')
      }
    } catch (error) {
      console.error('Error details:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={`${styles.card} mb-6`}>
        <CardHeader>
          <CardTitle><h2>YouTube Channel Analyzer</h2></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm text-gray-500 mb-2">
              Enter a YouTube channel ID (e.g., UC... or HC...). You can find this in 'Share channel'
            </div>
            <div className="flex gap-4">
              <Input
                placeholder="Enter channel ID (e.g., UCxxxxxxxxxxxxxxxxxxxxxxxxx)"
                value={channelId}
                onChange={(e) => {
                  setChannelId(e.target.value)
                  setError(null) // Clear error when input changes
                }}
                className={`${styles.input} flex-1`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && channelId) {
                    handleAnalyze()
                  }
                }}
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isLoading || !channelId} 
                className={styles.button}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Channel"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">
              <Video className="h-4 w-4 mr-2" />
              Recent Videos
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="h-4 w-4 mr-2" />
              Current Trends
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <PlaySquare className="h-4 w-4 mr-2" />
              Content Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Videos Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.recentVideos?.length > 0 ? (
                  <div className="space-y-4">
                    {analysis.recentVideos.map((video, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">{video.title}</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>Views: {video.views?.toLocaleString() ?? 'N/A'}</div>
                          <div>Engagement: {video.engagement ?? 'N/A'}%</div>
                          <div>Keywords: {video.keywords?.join(", ") ?? 'N/A'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No recent videos found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Current Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.trends?.length > 0 ? (
                  <div className="space-y-4">
                    {analysis.trends.map((trend, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">{trend.topic}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>Popularity: {trend.popularity}%</div>
                          <div>Relevance: {trend.relevance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No trends found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card>
              <CardHeader>
                <CardTitle>Content Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.suggestions?.length > 0 ? (
                  <div className="space-y-6">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3">{suggestion.title}</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium mb-1">Quick Script</h4>
                            <p className="text-sm">{suggestion.script}</p>
                          </div>
                          {suggestion.aiVideoUrl && (
                            <div>
                              <h4 className="font-medium mb-1">AI Video Preview</h4>
                              <video className="w-full rounded" controls src={suggestion.aiVideoUrl} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No suggestions found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default YouTubeAnalyzer