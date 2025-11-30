import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filterProduct, setCurrentUser, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import { MdShoppingCart } from "react-icons/md";
import homeicon from '../images/homeicon.png'
import ProductService from '../services/ProductService';
import type { ProductType } from '../types/Types';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setCurrentUser(null as any));
        localStorage.removeItem("currentUser")
        toast.success("Başarıyla çıkış yapıldı")
        navigate("/login", { replace: true });
    }
    const navigateHome = () => {
        navigate("/")
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                //Filtrelem yap
                dispatch(filterProduct(e.target.value))
            } else {
                //Tüm ürünleri göster
                const response: ProductType[] = await ProductService.getAllProducts();
                dispatch(setProducts(response));
            }
        } catch (error) {
            toast.error("Filtreleme yapılamadı :" + error);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#340e0eff" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <img onClick={navigateHome} style={{ width: '40px', height: '40px' }} src={homeicon} alt="" />
                    </IconButton>
                    <Typography
                        onClick={navigateHome}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, cursor: "pointer ", display: { xs: 'none', sm: 'block' } }}
                    >
                        E-COMMERCE
                    </Typography>
                    <Search onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase

                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <MdShoppingCart style={{ marginLeft: "9px", cursor: "pointer" }} />

                    <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar