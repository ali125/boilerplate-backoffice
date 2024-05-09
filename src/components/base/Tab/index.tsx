import MuiTab, { TabProps as MuiTabProps } from "@mui/material/Tab";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type TabProps = MuiTabProps & {
  closable?: boolean;
  onClose?: (e: React.MouseEvent<HTMLDivElement>, value: number) => void;
  codeViewTab?: boolean;
};

const Tab = styled((props: TabProps) => {
  const { closable, label, onClose, value, codeViewTab, ...rest } = props;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>, value: number) => {
    e.stopPropagation();
    onClose?.(e, value);
  };

  return (
    <MuiTab
      label={
        <Box className="flex items-center">
          <Typography variant="caption" className="break-all" fontSize={codeViewTab ? "0.65rem" : "0.75rem"}>
            {label}
          </Typography>
          {closable ? (
            <IconButton component="div" size="small" onClick={e => handleClose(e, value)}>
              <Close sx={{ fontSize: codeViewTab ? "0.95rem" : "1.1rem" }} />
            </IconButton>
          ) : null}
        </Box>
      }
      value={value}
      {...rest}
    />
  );
})(({ codeViewTab }) => ({
  maxWidth: "600px",
  minHeight: codeViewTab ? "32px" : "48px",
}));

export default Tab;
