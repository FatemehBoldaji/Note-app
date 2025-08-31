import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const categories = [
    'None',
    'Home',
    'Business',
    'Personal'
];
 const categoryBackgroundColors = {
        Home: '#a5d6a7',
        Business: '#b39ddb',
        Personal: '#ffcc80',
    };
    const categoryColors = {
        Home: '#1b5e20',
        Business: '#4a148c',
        Personal: '#e65100',
    }

export default function CategoriesItems({ value, onChange }) {
    const theme = useTheme();
    function getStyles(name) {
        return {
            fontWeight: value === name
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }
   
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <FormControl sx={{ width: '100%' }}>
            <InputLabel id="select-category-label">Categories</InputLabel>
            <Select
                labelId="select-category-label"
                value={value}
                label="Categories"
                onChange={handleChange}
                renderValue={(selected) => {
                    return (
                        <Chip
                            sx={{
                                backgroundColor: categoryBackgroundColors[selected],
                                color: categoryColors[selected],
                            }}
                            label={selected}
                        />
                    )
                }
                }
            >
                {
                    categories.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name)}
                        >
                            {name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}
