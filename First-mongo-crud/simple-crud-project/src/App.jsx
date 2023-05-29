
import './App.css'

function App() {
  const handleRegister = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    form.reset();
    console.log(user);
    fetch('http://localhost:5000/users',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('Users added successfully');
          form.reset();
        }
      })
  }
  return (
    <>
      <h1>Register to the website</h1>
      <form onSubmit={handleRegister} >
        <input type="text" name="name" id="" placeholder='name' /><br />
        <input type="email" name="email" id="" placeholder='email' /><br />
        <input type="submit" value="Register" />
      </form>
    </>
  )
}

export default App
