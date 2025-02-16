import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs.jsx"
import { TrendingUp, Video, Lightbulb } from "lucide-react"
import { Button } from "./ui/button.jsx"
import { Input } from "./ui/input.jsx"
import { Card } from "./ui/card.jsx"

export default function YouTubeAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">YouTube Channel Analyzer</h1>
        <div className="flex gap-3">
          <Input type="text" placeholder="https://www.youtube.com/@TEDx/videos" className="flex-1" />
          <Button>Analyze Channel</Button>
        </div>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Recent Videos
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Current Trends
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Content Suggestions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Videos Analysis</h2>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-3">How to Make Perfect Pasta</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Views</div>
                  <div className="font-medium">15,000</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                  <div className="font-medium">8.5%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Keywords</div>
                  <div className="font-medium">cooking, pasta, recipe</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Current Trends</h2>
          </Card>
        </TabsContent>
        <TabsContent value="suggestions">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Content Suggestions</h2>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

