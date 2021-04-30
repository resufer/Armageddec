let getAllData = async (isNow) => {
  let [yearNow, monthNow, dayNow] = getFixTime(isNow); debugger;

  let timeReceiving = `${yearNow}-${monthNow}-${dayNow}`;
  let url = `https://api.nasa.gov/neo/rest/v1/feed?
  start_date=${timeReceiving}
  &end_date=${timeReceiving}
  &api_key=1jMHuIyIAE3y1AHOZ6uCDkNnFQl9F6cC7edjjcBL`;

  let allData = await fetch(url);
  allData = await allData.json();

  return [allData, timeReceiving];
};


export let sortData = async (isNow = 0) => {
  let [allData, timeReceiving] = await getAllData(isNow);
  allData = allData['near_earth_objects'][timeReceiving];

  let data = [];

  for (let i = 0; i < allData.length; i++) {
    let name = allData[i].name;
    name = name.split(' ');
    if (name.length === 3) {
      name = name.slice(1);
    }
    name = name[0].slice(1) + ' ' + name[1].slice(0, name[1].length - 1); // 1

    let time = sortTime(timeReceiving); // 2

    let distances = {
      kilo: Math.round(allData[i]['close_approach_data'][0]['miss_distance']['kilometers']),
      moon: Math.round(allData[i]['close_approach_data'][0]['miss_distance']['lunar'])
    }; // 3

    let size = allData[i]['estimated_diameter']['meters'];
    size = Math.round(Object.values(size).reduce((a, b) => a + b, 0) / 2); // 4

    let isDangerous = allData[i]['is_potentially_hazardous_asteroid']; // 5

    data.push({ name, time, distances, size, isDangerous });
  };

  return data;
};


function sortTime(time) { // example : "2021-04-24"
  time = time.split('-');

  let months = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
  ];

  let day = time[2];
  let year = time[0];
  let month = months[time[1] - 1];

  return day + ' ' + month + ' ' + year;
};


function getFixTime(isNow) {
  let date = new Date();
  let yearNow = date.getFullYear(); debugger;
  let monthNow = date.getMonth() + 1; debugger;
  let dayNow = date.getDate() + isNow; debugger;


  let countDays;
  if ([1, 3, 5, 7, 8, 10, 12].includes(monthNow)) {
    countDays = 31; debugger;
  } else if ([4, 6, 9, 11].includes(monthNow)) {
    countDays = 30; debugger;
  } else if (yearNow % 4 === 0) {
    countDays = 29; debugger;
  } else {
    countDays = 28; debugger;
  }

  if (dayNow > countDays) {
    dayNow = 1;
    monthNow += 1; debugger;
  }
  if (monthNow > 12) {
    monthNow = 1;
    yearNow += 1; debugger;
  }


  if (monthNow < 10) {
    monthNow = '0' + monthNow;
  }
  if (dayNow < 10) {
    dayNow = '0' + dayNow;
  }

  return [yearNow, monthNow, dayNow];
}
