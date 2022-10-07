import { Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../components/Card';

import Carousel from '../components/Carousel';
import FilterContainer from '../components/FilterContainer';
import { getAllProperties, getFilteredProperties } from '../data/api';

const Home = ({ isSearch }) => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filterValues, setFilterValues] = useState({
    location: searchParams.get('location') || '',
    moveInDate: searchParams.get('moveInDate') || '',
    priceRange: searchParams.get('priceRange') || '',
    propertyType: searchParams.get('propertyType') || '',
  });

  useEffect(() => {
    if (pathname === '/search') {
      const newProperties = getFilteredProperties(filterValues);
      setProperties(newProperties);
    } else {
      setProperties(getAllProperties());
    }
  }, [filterValues, pathname]);

  const handleSubmit = (e, values) => {
    e.preventDefault();
    const params = new URLSearchParams();
    values.propertyType && params.append('propertyType', values.propertyType);
    values.location && params.append('location', values.location);
    values.priceRange && params.append('priceRange', values.priceRange);
    values.moveInDate && params.append('moveInDate', values.moveInDate);
    navigator(`/search?${params.toString()}`);
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
