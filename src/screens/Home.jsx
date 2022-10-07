import { Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../components/Card';

import Carousel from '../components/Carousel';
import FilterContainer from '../components/FilterContainer';
import { getAllProperties, getFilteredProperties } from '../data/api';

const Home = ({ isSearch }) => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filterValues, setFilterValues] = useState({
    location: searchParams.get('location') || '',
    moveInDate: searchParams.get('moveInDate') || '',
    priceRange: searchParams.get('priceRange') || '',
    propertyType: searchParams.get('propertyType') || '',
    needFilter: isSearch,
  });

  useEffect(() => {
    if (filterValues.needFilter) {
      const params = new URLSearchParams();
      filterValues.propertyType &&
        params.append('propertyType', filterValues.propertyType);
      filterValues.location && params.append('location', filterValues.location);
      filterValues.priceRange &&
        params.append('priceRange', filterValues.priceRange);
      filterValues.moveInDate &&
        params.append('moveInDate', filterValues.moveInDate);

      navigator(`/search?${params.toString()}`);
      const newProperties = getFilteredProperties(filterValues);
      setProperties(newProperties);
    } else {
      setProperties(getAllProperties());
    }
  }, [filterValues, navigator]);

  const handleSubmit = (e, values) => {
    e.preventDefault();
    setFilterValues(values);
  };

  return (
    <>
      {!isSearch && <Carousel />}

      <Heading mt="5">Search properties to rent</Heading>

      {/* Filter Container */}
      <FilterContainer
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        handleSubmit={handleSubmit}
      />

      {/* List of products */}
      <Grid templateColumns="repeat(12, 1fr)" gap={6} my="10">
        {properties.length > 0 ? (
          properties.map(property => (
            <GridItem
              colSpan={{ base: '12', md: '6', lg: '4' }}
              key={property.id}
            >
              <Card property={property} />
            </GridItem>
          ))
        ) : (
          <GridItem colSpan={'12'}>
            <Heading>No Property to show, try different filter</Heading>
          </GridItem>
        )}
      </Grid>
    </>
  );
};

export default Home;
