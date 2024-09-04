import Link from "next/link"
import styles from "@/utils/sass/oneLink.module.scss"
import { signOut } from "@/auth"
const OneLink = ({ oneLink }) => {
    return (
        <div className={styles.navLink}>
            <Link href={oneLink.route}>
                {oneLink.title}</Link>

        </div>
    )
}

export default OneLink