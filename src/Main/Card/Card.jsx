import React from 'react';
import dino from '../img/dino.png';
import asteroid from '../img/asteroid.png';

class Card extends React.Component {
  state = {
    dimensions: 0
  }

  componentDidMount() {
    let dimensions;
    if (this.props.data.size >= 800) {
      dimensions = 3;
    } else if (this.props.data.size >= 200) {
      dimensions = 2;
    } else {
      dimensions = 1;
    }
    this.setState({ dimensions });
  }

  render() {
    return (
      <div className={this.props.data.isDangerous ? ' bad-card' : 'good-card'}>
        <div className='images'>
          <div className={`asteroid asteroid${this.state.dimensions}`}>
            <img src={asteroid} alt='asteroid' />
          </div>
          <div className='dino'>
            <img src={dino} alt='dino' />
          </div>
        </div>

        <div className='info'>
          <div className='name'>{this.props.data.name}</div>
          <div className='date'>
            <span>Дата:</span>
            <span>{this.props.data.time}</span>
          </div>
          <div className='distances'>
            <span>Расстояние:</span>
            <span>
              {this.props.kilometers ?
                this.props.data.distances.kilo + ' км' :
                this.props.data.distances.moon + ' лун'}
            </span>
          </div>
          <div className='size'>
            <span>Размер:</span>
            <span>{this.props.data.size + ' м'}</span>
          </div>
        </div>

        <div className='appraisal'>
          <div className='dangerous'>Оценка:
          <div>{this.props.data.isDangerous ? 'опасен' : 'не опасен'}</div>
          </div>
          <div className='destruction'>
            <button>На уничтожение</button>
          </div>
        </div>
      </div>
    )
  }
};

export default Card;