require("./scss/style.scss");

import "./loading/page";
import { bootstrapAsync, getCurrentPage } from "./app";
bootstrapAsync(getCurrentPage());
