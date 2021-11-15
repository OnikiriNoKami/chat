import { makeStyles } from "@mui/styles";

const useBoxStyles = makeStyles(()=>{
    return {
        box: {
            width: '100%',
            display: 'flex',
            flexGrow: 1,
            height: '100%',
            alignItems: 'center',
        },
    }
})

export default useBoxStyles;