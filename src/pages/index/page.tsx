import * as React from "react";
import Link from "umi/link";
import { Button } from "../../components/Button";

import styles from "./page.css";

export default () => {
    return (
        <div className={styles.normal}>
            <h2>Index Page</h2>
            <Button />
            <Link to="/list">Go to list.html</Link>
        </div>
    );
};
