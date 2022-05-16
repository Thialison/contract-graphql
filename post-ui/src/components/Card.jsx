import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const formatedDate = new Date(
  +new Date() - Math.floor(Math.random() * 10000000000)
);

export default function BasicCard({ title, content, user }) {
  return (
    <Card sx={{ minWidth: 275 }} style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" fontSize={12}>
          <div>
            {user ? (
              <div>
                Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")}{" "}
                by {user}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
}
