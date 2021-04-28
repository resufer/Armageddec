import React from 'react';

class Header extends React.Component {
  state = {
    astro: true
  }

  componentDidMount() {
    let asteroid = document.getElementById('asteroid');
    let destruction = document.getElementById('destruction');

    asteroid.addEventListener('click', (e) => {
      if (!this.state.astro) {
        this.setState({ astro: true })
      }
    });

    destruction.addEventListener('click', (e) => {
      if (this.state.astro) {
        this.setState({ astro: false })
      }
    });
  }

  render() {
    return (
      <header>
        <div className='title'>ARMAGGEDON V</div>
        <div className='links'>
          <span id='asteroid' className={this.state.astro ? 'active' : 'notActive'}>Астероиды</span>
          <span id='destruction' className={this.state.astro ? 'notActive' : 'active'}>Уничтожение</span>
        </div>
        <div className='description'>
          Сервис мониторинга и уничтожения астреоидов, опасно подлетающих к Земле.
      </div>
      </header>
    )
  }
};

export default Header;