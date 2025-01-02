import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Share2 } from "lucide-react";

export default function AffiliateLink() {
  const { toast } = useToast();
  const [affiliateLink] = useState("https://example.com/ref/123456");

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Link Copied",
      description: "Affiliate link has been copied to clipboard.",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Join via my referral link",
        text: "Sign up using my referral link",
        url: affiliateLink,
      });
    } catch (err) {
      console.error("Share failed:", err);
      toast({
        title: "Share Failed",
        description: "Unable to share the link. Please try copying instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Affiliate Link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={affiliateLink} readOnly className="flex-1" />
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="secondary" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        <div className="bg-accent/20 p-4 rounded-lg">
          <h3 className="font-medium mb-2">How it works</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Share this link with potential users</li>
            <li>When they sign up using your link, they'll be added to your network</li>
            <li>You'll earn commission for each successful referral</li>
            <li>Track your referrals and earnings in the Revenue tab</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}