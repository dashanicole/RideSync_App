import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { countries } from '../../../constant/Countries';

export default  function CountrySelect({handleCountry}) {
    return (
      <Autocomplete
        id="country-select-demo"
        options={countries}
        size='small'
        autoHighlight
        getOptionLabel={(option) => option.label}
       
        onChange={(event, value) => handleCountry(value.label)}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          
          );
          ef
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country*"
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: 'new-password',
              },
            }}
          />
        )}
        
      />
      
    );
  }
  
  