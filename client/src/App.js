import { useState } from "react";

function App() {

  const [form, setForm] = useState({
    amount: 0,
    description: '',
    date: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
    })

    console.log(res)
  }

  const handleInput = (e) => {
    let name = e.target.name
    let val = e.target.value
    setForm({...form, [name]: val})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="number"
          name="amount"
          value={form.amount} 
          onChange={handleInput} 
          placeholder="Enter Transaction amount" 
        />
        <input 
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter Transaction details" 
        />
        <input 
          type="date" 
          name="date"
          value={form.date}
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
