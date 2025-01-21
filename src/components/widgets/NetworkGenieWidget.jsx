import { useState } from "react";
import BaseWidget from "./BaseWidget";
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
  InputAdornment,
  Avatar,
  useTheme,
  Divider,
} from "@mui/material";
import { Send, SmartToy } from "@mui/icons-material";

function NetworkGenieWidget({ widget, isFullscreen }) {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I am Network Genie. How can I assist you today?",
    },
    {
      type: "bot",
      text: "I can help you with:\n• Network performance analysis\n• Coverage issues\n• Traffic patterns\n• Network optimization",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { type: "user", text: input },
        {
          type: "bot",
          text:
            "I understand your question about " +
            input +
            ". Let me analyze that for you.",
        },
      ]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <BaseWidget widget={widget}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: isFullscreen ? "calc(80vh - 100px)" : "calc(100% - 20px)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            mb: 2,
            p: 1,
            backgroundColor:
              theme.palette.mode === "light" ? "grey.100" : "grey.900",
            borderRadius: 1,
          }}
        >
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent:
                    message.type === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                  alignItems: "flex-start",
                }}
              >
                {message.type === "bot" && (
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 28,
                      height: 28,
                      mr: 1,
                    }}
                  >
                    <SmartToy sx={{ fontSize: 16 }} />
                  </Avatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: "80%",
                    backgroundColor:
                      message.type === "user"
                        ? "primary.main"
                        : theme.palette.mode === "light"
                        ? "white"
                        : "grey.800",
                    color:
                      message.type === "user"
                        ? "primary.contrastText"
                        : "text.primary",
                    borderRadius:
                      message.type === "user"
                        ? "20px 20px 5px 20px"
                        : "20px 20px 20px 5px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "pre-line",
                      fontSize: isFullscreen ? "1rem" : "0.875rem",
                    }}
                  >
                    {message.text}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        <Box sx={{ p: 1, backgroundColor: "background.paper" }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            variant="outlined"
            placeholder="Ask Network Genie..."
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSend}
                    color="primary"
                    disabled={!input.trim()}
                    size="small"
                  >
                    <Send fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "white" : "grey.900",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "grey.300" : "grey.800",
                },
              },
            }}
          />
        </Box>
      </Box>
    </BaseWidget>
  );
}

export default NetworkGenieWidget;
