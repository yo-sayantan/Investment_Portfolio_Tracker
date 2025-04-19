import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { blue, cyan, green, orange, purple } from '@mui/material/colors';
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PieChartIcon from "@mui/icons-material/PieChart";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import Gradient from 'react-gradient';
import MutualFund from "../pages/MutualFund";
import { useDispatch } from "react-redux";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountCircle, CreditCard } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/ActionCreator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMMON_URL } from "../constants/URL";
import ManageMutualFund from "../pages/ManageMutualFund";
import CreditCards from "../pages/CreditCards";
import Expenses from "../pages/Expenses";
import BudgetViewer from "../pages/BudgetViewer";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function loadIcon(data, filled = false) {
  const iconStyles = {
    width: 38,
    height: 38,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,123,255,0.10)",
    color: "#007bff",
    fontSize: 28,
    ...(filled && {
      background:
        data === "Mutual Funds"
          ? blue[500]
          : data === "Manage Mutual Fund"
          ? green[500]
          : data === "Budget Viewer"
          ? orange[500]
          : data === "Expenses"
          ? purple[500]
          : data === "Credit Cards"
          ? cyan[500]
          : "#007bff",
      color: "#fff",
      boxShadow: "0 4px 16px rgba(0,123,255,0.18)",
    }),
    transition: "background 0.2s, color 0.2s",
  };

  const icons = {
    "Budget Viewer": <AttachMoneyIcon sx={iconStyles} />,
    "Mutual Funds": <AttachMoneyIcon sx={iconStyles} />,
    "Manage Mutual Fund": <MoneyIcon sx={iconStyles} />,
    "Expenses": <AddCardIcon sx={iconStyles} />,
    "Credit Cards": <CreditCardIcon sx={iconStyles} />,
  };
  return icons[data];
}

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [mainMenuControl, setMainMenuControl] = React.useState("Mutual Funds");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const upperMenus = ["Log Out"]  // ["Profile", "Settings", "Log Out"];
  const sideMenus = ["Mutual Funds"]  // "Budget Viewer", "Expenses", "Credit Cards"];
  const adminMenus = ["Manage Mutual Fund"];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let control;
  if (mainMenuControl === "Mutual Funds") control = <MutualFund />;
  // else if (mainMenuControl === "Budget Viewer") control = <BudgetViewer />
  // else if (mainMenuControl === "Expenses") control = <Expenses />
  // else if (mainMenuControl === "Credit Cards") control = <CreditCards />;
  else if (mainMenuControl === "Manage Mutual Fund") control = <ManageMutualFund />;

  const handleMainMenuControl = (value) => {
    setMainMenuControl(value);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleActionOnUpperMenu = (value) => {
    if (value.target.innerText === "Log Out") {
      axios.defaults.headers.common['Authorization'] = cookies['access_token'];
      axios.post(COMMON_URL + 'auth/logout').then((response) => {
        removeCookie('access_token');
        actions.logoutAction();
        navigate('/login');
      }).catch((error) => {
        removeCookie('access_token');
        actions.logoutAction();
        navigate('/login');
      });;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color="transparent"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
          boxShadow: "0 4px 24px rgba(0,123,255,0.10)",
          borderBottom: "2px solid #e3eafc",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                background: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,123,255,0.10)",
              }}
            >
              <MenuIcon sx={{ color: "#007bff" }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,123,255,0.10)",
              }}
            >
              Portfolio Tracker
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  background: "#fff",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,123,255,0.10)",
                  ml: 2,
                }}
              >
                <AccountCircle sx={{ color: "#007bff", fontSize: 36 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px',
                "& .MuiPaper-root": {
                  borderRadius: 3,
                  minWidth: 160,
                  background: "linear-gradient(90deg, #e3f0ff 0%, #f8fafc 100%)",
                  boxShadow: "0 4px 24px rgba(0,123,255,0.10)",
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {upperMenus.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={(setting) => handleActionOnUpperMenu(setting)}
                  sx={{
                    fontWeight: 700,
                    color: "#007bff",
                    "&:hover": {
                      background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                      color: "#fff",
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            background: "linear-gradient(120deg, #e3f0ff 80%, #cce6ff 100%)",
            borderRight: "2px solid #e3eafc",
            boxShadow: "0 4px 24px rgba(0,123,255,0.10)",
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#007bff" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "#007bff" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideMenus.map((text) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 3,
                  margin: "6px 0",
                  background: mainMenuControl === text
                    ? "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)"
                    : "transparent",
                  color: mainMenuControl === text ? "#fff" : "#007bff",
                  fontWeight: mainMenuControl === text ? 900 : 700,
                  boxShadow: mainMenuControl === text ? "0 2px 8px rgba(0,123,255,0.10)" : "none",
                  "&:hover": {
                    background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                    color: "#fff",
                  }
                }}
                onClick={() => handleMainMenuControl(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: mainMenuControl === text ? "#fff" : "#007bff",
                  }}
                >
                  {loadIcon(text)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontWeight: mainMenuControl === text ? 900 : 700,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {adminMenus.map((text) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 3,
                  margin: "6px 0",
                  background: mainMenuControl === text
                    ? "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)"
                    : "transparent",
                  color: mainMenuControl === text ? "#fff" : "#007bff",
                  fontWeight: mainMenuControl === text ? 900 : 700,
                  boxShadow: mainMenuControl === text ? "0 2px 8px rgba(0,123,255,0.10)" : "none",
                  "&:hover": {
                    background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                    color: "#fff",
                  }
                }}
                onClick={() => handleMainMenuControl(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: mainMenuControl === text ? "#fff" : "#007bff",
                  }}
                >
                  {loadIcon(text)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontWeight: mainMenuControl === text ? 900 : 700,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, md: 3 },
          background: "linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        {control}
      </Box>
    </Box>
  );
}