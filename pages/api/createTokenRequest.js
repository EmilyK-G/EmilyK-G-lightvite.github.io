import Ably from 'ably/promises';

async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_SERVER_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: `lightvite-sockets` });
  if(!tokenRequestData.ok) console.log('ERROR', tokenRequestData);
  res.status(200).json(tokenRequestData);
};

export default handler