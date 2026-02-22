package io.heapy.kotrol.model

import kotlinx.serialization.Serializable

@Serializable
data class Dashboard(
    val groups: List<Group>,
)

@Serializable
data class Group(
    val name: String,
    val projects: List<Project>,
)
