import axios from 'axios'

function validateEmail(email) {
  const emailData = {
    email: email
  };
  axios
    .post(`http://localhost:3005/validate-email`, emailData)
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((error) => {
      console.error("Error:", error.data);
      return error.data
    });
}

export default validateEmail

