import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        position: 'absolute'
    },
}));

export default useStyles;