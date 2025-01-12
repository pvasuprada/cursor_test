import React, { useState } from "react";
import BaseWidget from "./BaseWidget";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";

function NetworkGenieWidget({ widget }) {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I can help you with:",
    },
    {
      type: "bot",
      text: "• Network performance analysis\n• Coverage issues\n• Traffic patterns",
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
          text: "I understand your question. Let me help you with that.",
        },
      ]);
      setInput("");
    }
  };

  return (
    <BaseWidget widget={widget}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "calc(100vh - 200px)", // Adjust based on your layout
        }}
      >
        {/* Messages Area */}
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
                }}
              >
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
                    variant="body1"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {message.text}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 1, backgroundColor: "background.paper" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask Network Genie..."
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSend}
                    color="primary"
                    disabled={!input.trim()}
                  >
                    <Send />
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
