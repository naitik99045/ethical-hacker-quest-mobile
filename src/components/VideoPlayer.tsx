
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title, description }) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Card className="border-green-500/30">
      <CardContent className="p-0">
        <div className="relative">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-64 rounded-t-lg"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <div className="p-4 space-y-3">
          <h3 className="text-green-400 terminal-font font-bold">{title}</h3>
          {description && (
            <p className="text-green-300 text-sm">{description}</p>
          )}
          <Button
            variant="outline"
            onClick={() => window.open(youtubeUrl, '_blank')}
            className="border-green-500 text-green-400 hover:bg-green-400/10"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Watch on YouTube
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
