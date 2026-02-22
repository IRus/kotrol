package io.heapy.kotrol.model

import kotlinx.serialization.Serializable

@Serializable
data class Projects(
    val projects: List<Project>,
)