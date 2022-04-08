const getCount = (services) => {
  //   let total_count = [];
  //   services.forEach((service) => {
  //     if (service[1] < 200) {
  //       total_count.push(service[0]);
  //     }
  //   });

  //   return [...new Set(total_count)].length;

  let total = {};
  services.forEach((service) => {
    if (service[1] < 200 && total[service[0]]) {
      total[service[0]] = total[service[0]] + service[1];
    }
  });
  console.log(total);
};

const services = [
  ["Swiggy", 123],
  ["Swiggy", 227],
  ["Zomato", 103],
  ["Zomato", 171],
  ["Dunzo", 131],
  ["Zomato", 122],
  ["Swiggy", 181],
];

console.log(getCount(services));
