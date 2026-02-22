package io.heapy.kotrol.model

import kotlinx.serialization.Serializable

@Serializable
data class Project(
    val title: String,
    val link: String,
    val logo: String,
)
