export type PortalConnection = {
  success: boolean;
  status: 'connected';
  portal: string;
  name: string;
  description: string;
  apiStatus: 'CONNECTED';
  timestamp: string;
};

export async function getPortalConnection(portal: string, token: string): Promise<PortalConnection> {
  const response = await fetch(`/api/v1/admin/portals/${encodeURIComponent(portal)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || body.message || 'Tidak dapat terhubung ke backend Laravel.');
  }

  return body as PortalConnection;
}
