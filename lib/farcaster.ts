export interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

export async function validateFrameRequest(request: any): Promise<FarcasterUser | null> {
  try {
    // Support both Fetch Request (Edge) and NextApiRequest (has .body)
    let body: any;
    if (request && typeof request.json === 'function') {
      body = await request.json();
    } else if (request && 'body' in request) {
      body = request.body;
    } else {
      return null;
    }

    // In a real implementation, validate the frame signature here.
    // For now, extract user data from untrustedData (as provided by Farcaster frames).
    if (body?.untrustedData?.fid) {
      return {
        fid: body.untrustedData.fid,
        username: body.untrustedData.username || `user${body.untrustedData.fid}`,
        displayName: body.untrustedData.displayName,
        pfpUrl: body.untrustedData.pfpUrl,
      };
    }

    return null;
  } catch (error) {
    console.error('Error validating frame request:', error);
    return null;
  }
}

export function generateFrameImageUrl(
  title: string,
  subtitle?: string,
  score?: number,
  backgroundColor: string = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
): string {
  const params = new URLSearchParams({
    title,
    ...(subtitle && { subtitle }),
    ...(score !== undefined && { score: score.toString() }),
    bg: backgroundColor,
  });
  
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/og?${params}`;
}

export function createFrameMetadata(
  image: string,
  buttons: string[],
  postUrl?: string,
  aspectRatio: '1.91:1' | '1:1' = '1.91:1'
) {
  const metadata: Record<string, string> = {
    'fc:frame': 'vNext',
    'fc:frame:image': image,
    'fc:frame:image:aspect_ratio': aspectRatio,
  };

  buttons.forEach((button, index) => {
    metadata[`fc:frame:button:${index + 1}`] = button;
  });

  if (postUrl) {
    metadata['fc:frame:post_url'] = postUrl;
  }

  return metadata;
}