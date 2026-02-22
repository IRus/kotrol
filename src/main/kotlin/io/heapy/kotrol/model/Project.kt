package io.heapy.kotrol.model

import kotlinx.serialization.Serializable

@Serializable
data class Project(
    val title: String,
    val links: List<Link>,
    val logo: String,
)

@Serializable
data class Link(
    val label: String,
    val url: String,
)
