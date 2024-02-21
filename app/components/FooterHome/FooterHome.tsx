import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const FooterHome = () => {
    return (
        <section className={styles.sectionFooter}>
            <div className={styles.divSocialMedia}>
            <a href="https://www.instagram.com/labs_if?igsh=a2libmE2anBrMTBy" target="_blank" rel="noopener noreferrer">
                <button className={styles.buttonSocialMedia}> 
                    <img src="/images/instagram.svg" alt="Logo Instagram"/>
                </button> 
            </a>
            <a href="https://www.linkedin.com/company/labsif/" target="_blank" rel="noopener noreferrer">
                <button className={styles.buttonSocialMedia}>
                    <img src="/images/linkedin.svg" alt="Logo LinkedIn"/>
                </button>
            </a>
            </div>

            <div className={styles.divLinks}>
                <a href="https://www.politicadeprivacidade.com.br/" target="_blank" rel="noopener noreferrer"><p className={styles.link}>Política de Privacidade</p></a>
                <p>/</p>
                <a href="https://www.termosdeservico.com.br/" target="_blank" rel="noopener noreferrer"><p className={styles.link}>Termos de Serviço</p></a>
                <p>/</p>
                <a href="https://www.preferenciadecookie.com.br/" target="_blank" rel="noopener noreferrer"><p className={styles.link}>Preferência de Cookies</p></a>
            </div>

            <div className={styles.divButtonPortal}>
                <Link className={styles.linkPortal} href={"/login"}>
                    <button className={styles.buttonPortal}>
                        Acessar Portal
                    </button>
                </Link>
            </div>
        </section>
    )

}

export default FooterHome