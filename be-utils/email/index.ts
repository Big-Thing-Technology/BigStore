import axios from 'axios'

export const sendEmail = async ({
  content,
  to,
  from,
  subject,
  RESEND_API_KEY,
}: {
  content: string
  to: string[]
  from: string
  subject: string
  RESEND_API_KEY: string
}) => {
  const res = await axios.post(
    'https://ses.kanban.vn/api/send-email',
    {
      from,
      to,
      subject,
      body: content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        token: `${RESEND_API_KEY}`,
      },
    }
  )
  if (res.status === 200) {
    return true
  }
  return false
}

export const sendEmailWithTemplate = async ({
  template,
  to,
  from,
  subject,
  templateInput,
  RESEND_API_KEY,
}: {
  template: 'reset-password' | 'verify-email' | 'invitation' | 'two-fa'
  to: string[]
  from: string
  subject: string
  templateInput: string
  RESEND_API_KEY: string
}) => {
  const res = await axios.post(
    'https://ses.kanban.vn/api/send-template',
    {
      template,
      to,
      subject,
      from,
      templateInput,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        token: `${RESEND_API_KEY}`,
      },
    }
  )
  if (res.status === 200) {
    return true
  }
  return false
}
