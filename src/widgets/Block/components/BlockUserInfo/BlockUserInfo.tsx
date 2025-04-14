"use client";

import React from 'react';
import cn from "classnames";
import { Avatar, Typography } from 'antd';
import {
    GithubOutlined,
    GitlabOutlined,
    InstagramOutlined,
    TwitchOutlined,
    PhoneOutlined,
    MailOutlined,
    TwitterOutlined
} from '@ant-design/icons';

import FormItem from "@shared/ui/FormItem";

import s from './BlockUserInfo.module.scss'

interface Props {
    className?: string;
}

const BlockUserInfo: React.FC<Props> = ({ className }) => {
    const links = [
        { icon: <GithubOutlined />, link: "https://github.com/aman1998" },
        { icon: <GitlabOutlined />, link: "https://github.com/aman1998" },
        { icon: <InstagramOutlined />, link: "https://github.com/aman1998" },
        { icon: <TwitchOutlined />, link: "https://github.com/aman1998" },
        { icon: <PhoneOutlined />, link: "https://github.com/aman1998" },
        { icon: <MailOutlined />, link: "https://github.com/aman1998" },
        { icon: <TwitterOutlined />, link: "https://github.com/aman1998" }
    ]

    return (
        <section className={cn(s.info, className)}>
            <Avatar
                className={s.info__avatar}
                size={200}
                alt="avatar"
                src="https://jjvqbgslotretwtfjbzo.supabase.co/storage/v1/object/public/instagram-media/a4dfd1b6-8204-4ab5-b4a8-ba61d8838e71/18343023511179378/images/18343023511179378.jpg" />
            <Typography.Title level={2} style={{ textAlign: "center", margin: "8px 0" }}>Beatrice Wambui</Typography.Title>
            <Typography.Text style={{ textAlign: "center" }}>FullStack Developer</Typography.Text>
            <div className={s.info__links}>
                {links.map((item, i) => <a href={item.link} target="_blank" key={i}><FormItem>{item.icon}</FormItem></a>)}
            </div>
            <FormItem className={s.info__contacts}>
                Hello there! I'm thrilled to welcome you to my portfolio. I am a passionate and versatile
                full-stack developer with a keen interest in exploring the latest cutting-edge technologies.
                My journey in the world of web development has been nothing short of exhilarating, and
                I constantly strive to enhance my skills and embrace emerging trends in the industry.
            </FormItem>
        </section>
    )
}

export default BlockUserInfo;