import React from 'react';
import Card from './Card/Card';
import { sortData } from './request';

class Main extends React.Component {
  state = {
    kilometers: true,
    asteroids: [],
    showAsteroids: [],
    isNow: 0
  }

  async setData() {
    let data = await sortData(this.state.isNow);
    this.setState({ asteroids: [...this.state.asteroids, ...data.slice(4)] });
    this.setState({ showAsteroids: [...this.state.showAsteroids, ...data.slice(0, 4)] });
  }

  componentDidMount() {
    this.setData();
    let kilo = document.getElementById('kilo');
    kilo.addEventListener('click', () => {
      if (!this.state.kilometers) {
        this.setState({ kilometers: true })
      }
    });

    let moon = document.getElementById('moon');
    moon.addEventListener('click', () => {
      if (this.state.kilometers) {
        this.setState({ kilometers: false })
      }
    });

    document.addEventListener('scroll', () => {
      if (window.pageYOffset >= document.documentElement.scrollHeight - 1000) {
        if (this.state.asteroids.length >= 2) {
          this.setState({
            showAsteroids:
              [...this.state.showAsteroids, ...this.state.asteroids.slice(0, 2)]
          });
          this.setState({
            asteroids:
              this.state.asteroids.slice(2)
          });
        } else {
          this.setState({ isNow: this.state.isNow + 1 });
          this.setData()
        }
      }
    });
  }

  render() {
    return (
      <main>
        <div className='control'>
          <div className='distance'>
            <span id='kilo' className={this.state.kilometers ? 'active' : 'notActive'}>Расстояние в километрах, </span>
            <span id='moon' className={this.state.kilometers ? 'notActive' : 'active'}> в дистанциях до луны</span>
          </div>
        </div>
        {this.state.showAsteroids && this.state.showAsteroids.map(data => {
          return <Card key={data.name}
            data={data}
            kilometers={this.state.kilometers} />
        })}
      </main>
    )
  }
};

export default Main;