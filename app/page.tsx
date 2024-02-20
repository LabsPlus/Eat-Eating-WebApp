"use client";
import styles from "./page.module.css";
import { Button, ConfigProvider } from "antd";
import React from "react";
import theme from "../theme/themeConfig";
import { useAuthContext } from "@/app/contexts/AuthContext";
import HeaderHome from "./components/HeaderHome/HeaderHome";
import Link from "next/link";
import Image from "next/image";
import FooterHome from "./components/FooterHome/FooterHome";

export default function Home() {
  const { user, logout } = useAuthContext();

  return (
    <ConfigProvider theme={theme}>
      <main className={styles.main}>
        <HeaderHome />

        <section className={styles.sectionWelcome}>
          <div className={styles.messageWelcome}>
            <h1>Bem-vindo ao EatEating</h1>
            <p>Gerenciamento de filas para Restaurantes Universitários em Universidades Públicas</p>
            <Button className={styles.buttonWelcome}>Conhecer mais</Button>
          </div>

          <div>
            <Image
              src="/images/img-boas-vindas-home.png"
              alt="Logo EatEating"
              width={617}
              height={432}
              priority={true}
            />
          </div>
        </section>

        <section className={styles.sessionPortalChoice}>
          <h2>Escolha o portal que deseja acessar</h2>
          <div className={styles.sessionPortals}>
            <div className={styles.portal}>
              <Image
                src="/images/img_portal_restaurante.png"
                alt="Jovens reunidos na mesa"
                width={555}
                height={421}
                className={styles.sessionPortalChoice_image}
              />
              <div className={styles.sessionPortalChoice_overlay}>
                <p>Faça pedidos, consulte cardápios e gerencie suas reservas no Restaurante Universitário da sua universidade.</p>
                <Button className={styles.button_sessionPortalChoice_overlay}>Restaurante Universitário</Button>
              </div>
            </div>

            <div className={styles.portal}>
              <Image
                src="/images/img_portal_administrador.png"
                alt="Homen de terno com uma caneta na mão"
                width={555}
                height={421}
                className={styles.sessionPortalChoice_image}
              />
              <div className={styles.sessionPortalChoice_overlay}>
                <p>Gerencie a operação do EatEating, configure cardápios, monitore estatísticas e muito mais.</p>
                <Button className={styles.button_sessionPortalChoice_overlay}>Administrador</Button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionBenefits}>
          <h2>Benefícios</h2>
          <div className={styles.sessionBenefitsBanner}>
            <div className={styles.benefitAccess}>
              <Image
                src="/images/iconoir_pc-check.png"
                alt="quadrado com sinal de marcação"
                width={65}
                height={65}
                className={styles.sessionBenefits_image1}
              />
              <p>Facilidade de acesso</p>
            </div>

            <div className={styles.benefitAccess}>
              <Image
                src="/images/iconoir_internet.png"
                alt="globo com "
                width={65}
                height={65}
                className={styles.sessionBenefits_image1}
              />
              <p>Pedido Online</p>
            </div>

            <div className={styles.benefitAccess}>
              <Image
                src="/images/fluent_food-16-filled.png"
                alt="Garfo e faca"
                width={65}
                height={65}
                className={styles.sessionBenefits_image1}
              />
              <p>Variedade no cardápio</p>
            </div>
          </div>

          <div className={styles.sessionBenefitsBanner}>
            <div className={styles.benefitAccess}>
              <Image
                src="/images/simple-icons_contactlesspayment.png"
                alt="Icone pagamento por aproximação"
                width={65}
                height={65}
                className={styles.sessionBenefits_image1}
              />
              <p>Integração com pagamento online</p>
            </div>

            <div className={styles.benefitAccess}>
              <Image
                src="/images/fluent_person-feedback-48-regular.png"
                alt="Icone pessoa com caixa de texto"
                width={65}
                height={65}
                className={styles.sessionBenefits_image1}
              />
              <p>Feedback dos clientes</p>
            </div>

            <div className={styles.benefitAccess}>
              <Image
                src="/images/basil_notification-on-solid.png"
                alt="Icone sino"
                width={65}
                height={65}
                className={styles.sessionBenefits_image1}
              />
              <p>Notificação em tempo real</p>
              </div>
          </div>
        </section>

        <section className={styles.sectionPartners}>
          <h2>Nossos Parceiros</h2>
        <div className={styles.sectionPartnersBanner}>
          <div className={styles.sessionPartnersIcon}>
            <Image
              src="/images/Group 96.png"
              alt="Logo IFBaiano"
              width={150}
              height={308}
              className={styles.sessionPartners_image}
            />
          </div>

          <div className={styles.sessionPartnersIcon}>
            <Image
              src="/images/Group 96.png"
              alt="Logo IFBaiano"
              width={150}
              height={308}
              className={styles.sessionPartners_image}
            />
          </div>

          <div className={styles.sessionPartnersIcon}>
            <Image
              src="/images/Group 96.png"
              alt="Logo IFBaiano"
              width={150}
              height={308}
              className={styles.sessionPartners_image}
            />
          </div>

          <div className={styles.sessionPartnersIcon}>
            <Image
              src="/images/Group 96.png"
              alt="Logo IFBaiano"
              width={150}
              height={308}
              className={styles.sessionPartners_image}
            />
          </div>

          <div className={styles.sessionPartners}>
            <Image
              src="/images/Group 96.png"
              alt="Logo IFBaiano"
              width={150}
              height={308}
              className={styles.sessionPartners_image}
            />
          </div>

          <div className={styles.sessionPartnersIcon}>
            <Image
              src="/images/Group 96.png"
              alt="Logo IFBaiano"
              width={150}
              height={308}
              className={styles.sessionPartners_image}
            />
          </div>
          </div>
        </section>

        <FooterHome />

        {user ? (
          <>
            <h1>Oi, {user}!</h1>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <h1>
            Você não está autenticado. Por favor,{" "}
            <Link href={"/login"}>faça login</Link> .{" "}
          </h1>
        )}
      </main>
    </ConfigProvider>
  );
}
