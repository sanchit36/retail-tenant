import React, { useState } from 'react';
import Select from 'react-select';
import {
  Grid,
  GridItem,
  Box,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select as CSelect,
} from '@chakra-ui/react';
import { getCityOptions } from '../data/api';

const options = getCityOptions();

const FilterContainer = ({ filterValues, handleSubmit }) => {
  const [location, setLocation] = useState(
    filterValues.location
      ? {
          label: filterValues.location,
          value: filterValues.location,
        }
      : undefined
  );
  const [moveInDate, setMoveInDate] = useState(filterValues.moveInDate);
  const [propertyType, setPropertyType] = useState(filterValues.propertyType);
  const [priceRange, setPriceRange] = useState(() => {
    const p = filterValues.priceRange.split('-');
    return p.length === 1 ? [1500, 5000] : p;
  });

  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.900')}
      mt="4"
      py={'4'}
      px={'8'}
      boxShadow={'xl'}
      rounded={'lg'}
      position={'relative'}
      zIndex={2}
    >
      <Grid
        templateColumns={'repeat(9, 1fr)'}
        gap={6}
        alignItems={'center'}
        as="form"
        onSubmit={e =>
          handleSubmit(e, {
            location: location ? location.value : '',
            moveInDate,
            priceRange: priceRange.join('-'),
            propertyType,
            needFilter: true,
          })
        }
      >
        <GridItem colSpan={'2'}>
          <Stack spacing={2}>
            <Text fontSize={'lg'} fontWeight={'semi-bold'}>
              Location
            </Text>
            <Select
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? 'white' : 'black',
                }),
              }}
              isClearable
              isSearchable
              options={options}
              value={location}
              onChange={newValue => setLocation(newValue)}
            />
          </Stack>
        </GridItem>
        <GridItem colSpan={'2'}>
          <Text fontSize={'lg'} fontWeight={'semi-bold'}>
            Move In Date
          </Text>
          <Input
            type={'date'}
            value={moveInDate}
            onChange={e => setMoveInDate(e.target.value)}
          />
        </GridItem>
        <GridItem colSpan={'2'}>
          <Text fontSize={'lg'} fontWeight={'semi-bold'}>
            Price
          </Text>
          <Stack direction={'row'} alignItems={'center'} spacing={'4'}>
            <Text fontSize={'xs'}>${priceRange?.[0] || 1500}</Text>
            <RangeSlider
              min={1500}
              max={5000}
              step={10}
              value={priceRange}
              onChange={setPriceRange}
              onChangeEnd={setPriceRange}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text fontSize={'xs'}>${priceRange?.[1] || 5000}</Text>
          </Stack>
        </GridItem>
        <GridItem colSpan={'2'}>
          <Text fontSize={'lg'} fontWeight={'semi-bold'}>
            Property Type
          </Text>
          <CSelect
            type="select"
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
          >
            <option value="">None</option>
            <option value="Single Family">Single Family</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Apartment">Apartment</option>
          </CSelect>
        </GridItem>
        <GridItem colSpan={'1'} justifySelf={'flex-end'}>
          <Button colorScheme={'teal'} size={'lg'} type="submit">
            Search
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FilterContainer;
