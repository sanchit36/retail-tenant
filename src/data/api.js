import properties from './index';

export const getAllProperties = () => {
  return properties;
};

export const getFilteredProperties = filterValues => {
  let newFilteredProperties = properties;

  if (filterValues.location) {
    newFilteredProperties = newFilteredProperties.filter(property => {
      const city = property.address.split(',')[2].trim();
      return city === filterValues.location;
    });
  }

  if (filterValues.moveInDate) {
    newFilteredProperties = newFilteredProperties.filter(property => {
      const date1 = new Date(property.moveInDate);
      const date2 = new Date(filterValues.moveInDate);
      return date1 <= date2;
    });
  }

  if (filterValues.priceRange) {
    const [min, max] = filterValues.priceRange.split('-');

    newFilteredProperties = newFilteredProperties.filter(property => {
      const price = Number(property.price.split('$')[1].split(',').join(''));
      console.log(price);
      return price >= min && price <= max;
    });
  }

  if (filterValues.propertyType) {
    newFilteredProperties = newFilteredProperties.filter(property => {
      return filterValues.propertyType === property.propertyType;
    });
  }
  return newFilteredProperties;
};

export const getSingleProperty = id => {
  const property = properties.find(p => p.id === id);
  return property;
};

export const getCityOptions = () => {
  const cities = new Set();
  properties.forEach(property => {
    const city = property.address.split(',')[2].trim();
    cities.add(city);
  });
  const options = [];
  cities.forEach(city => {
    const option = {
      label: city,
      value: city,
    };
    options.push(option);
  });
  return options;
};
