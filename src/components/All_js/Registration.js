import React from 'react';
import '../All_css/Registration.css';

const data = [
  { name: 'basic', cost: 9, grad: '#0fcf7b, #0c9f30' },
  { name: 'standard', cost: 19, grad: '#f7256e, #cc0c48' },
  { name: 'premium', cost: 29, grad: '#f7ea1f, #f87d2c' },
];

const App = () => {
  return (
    <div className='registration' style={{ '--n': data.length }}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between', padding:'5% 20%'}}>{data.map((c, i) => (
        <article key={c.name} style={{ '--i': i, '--cost': c.cost, '--grad': c.grad ,width:'25%',height:'125%'}}>
          <headers>
            <h3 data-name={c.name}>{c.name}</h3>
          </headers>
          <section>
            <button>Sign up</button>
          </section>
        </article>
      ))}</div>
      
    </div>
  );
};

export default App;
