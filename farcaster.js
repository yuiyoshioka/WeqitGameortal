async function loginFarcaster() {
  const client = new AuthKit({ rpcUrl: 'https://hub.farcaster.xyz' });
  const session = await client.signIn();
  return {
    fid: session.fid,
    username: session.username,
    avatar: session.pfpUrl
  };
}
