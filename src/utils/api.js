import axios from 'axios'

export const api = `${process.env.VUE_APP_BASE_API_URL}/v${process.env.VUE_APP_API_VERSION}/`

export const postLogin = async (email, password) => {
  const fullUrl = new URL('user/login', api)
  let response
  try {
    response = await axios.post(
      fullUrl.toString(),
      {
        email,
        password
      }
    )
  } catch (e) {
    const error = parseInt(e.message.replace("Request failed with status code ", ""))
    let message

    switch (error) {
      case 400:
        message = "Invalid email or password format. Please check and try again."
        break
      case 403:
        message = "Your email/password combination is incorrect. Please check and try again."
        break
      default:
        message = "There was a problem with your submission. Please try again later."
    }

    response = {
      status: error,
      message: message
    }
  }

  return response
}

export const postReset = (email) => {
  const fullUrl = new URL('user/reset/' + email, api)
  return axios.post(fullUrl.toString(),
    {
      email
    }).then(response => response)
}

export const updateUser = (email_token, email, password) => {
  const fullUrl = new URL('user', api)
  return axios.put(fullUrl.toString(),
    {
      email,
      password,
    },
    {
      headers: {
        'token': email_token
      }
    }
  ).then(response => response)
}
