import React from 'react';

type PageProps = {
  params: {
    inviteId: string
  }
}

const fetchInvite = async (inviteId:string) => {
  console.log(inviteId)
}

async function InvitePage({params: {inviteId}}: PageProps) {

  const invite = await fetchInvite(inviteId)

  return (
    <div>
      <p>{`This will be your invite:))`}</p>
      <p>{`Currently, this is your socket.io room number: ` + inviteId}</p>
    </div>
  )
}

export default InvitePage