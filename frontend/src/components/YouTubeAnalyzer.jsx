"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button.jsx"
import { Input } from "./ui/input.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs.jsx"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.jsx"
import { Loader2, TrendingUp, PlaySquare, Video } from "lucide-react"
import styles from "./YouTubeAnalyzer.module.css"

const YouTubeAnalyzer = () => {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
  
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
  
      // Log the raw response
      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Only try to parse as JSON if we're expecting JSON
      const data = JSON.parse(rawResponse);
      setAnalysis(data);
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={`${styles.card} mb-6`}>
        <CardHeader>
          <CardTitle>YouTube Channel Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter YouTube channel URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`${styles.input} flex-1`}
            />
            <Button onClick={handleAnalyze} disabled={isLoading || !url} className={styles.button}>
              {isLoading ? (
                <>
                  <Loader2 className={`${styles.loader} mr-2 h-4 w-4`} />
                  Analyzing...
                </>
              ) : (
                "Analyze Channel"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className={`${styles.alert} ${styles.alertDestructive} mb-6`}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList className={styles.tabs}>
            <TabsTrigger value="recent" className={styles.tab}>
              <Video className="h-4 w-4 mr-2" />
              Recent Videos
            </TabsTrigger>
            <TabsTrigger value="trends" className={styles.tab}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Current Trends
            </TabsTrigger>
            <TabsTrigger value="suggestions" className={styles.tab}>
              <PlaySquare className="h-4 w-4 mr-2" />
              Content Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle>Recent Videos Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.recentVideos.map((video, index) => (
                    <div key={index} className={`${styles.videoItem} p-4`}>
                      <h3 className="font-medium mb-2">{video.title}</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>Views: {video.views.toLocaleString()}</div>
                        <div>Engagement: {video.engagement}%</div>
                        <div>Keywords: {video.keywords.join(", ")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle>Current Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.trends.map((trend, index) => (
                    <div key={index} className={`${styles.trendItem} p-4`}>
                      <h3 className="font-medium mb-2">{trend.topic}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Popularity: {trend.popularity}%</div>
                        <div>Relevance: {trend.relevance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle>Content Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className={`${styles.suggestionItem} p-4`}>
                      <h3 className="font-medium mb-3">{suggestion.title}</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-1">Quick Script</h4>
                          <p className="text-sm">{suggestion.script}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">AI Video Preview</h4>
                          <video className={`${styles.video} w-full`} controls src={suggestion.aiVideoUrl} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default YouTubeAnalyzer

