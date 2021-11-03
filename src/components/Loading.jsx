import React from "react"
import Section from "./Section"
import { Spin, Skeleton } from "antd"

export default function Loading() {
    const indicator = <Skeleton avatar loading={true} active />

    return (
        <Section centered>
            <Skeleton avatar loading={true} active />
        </Section>
    )
}
