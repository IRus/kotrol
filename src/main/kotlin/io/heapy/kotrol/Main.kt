package io.heapy.kotrol

import com.charleskorn.kaml.Yaml
import io.heapy.kotrol.model.Projects
import java.io.File

fun main() {
    val outputDir = File("build/site")
    outputDir.mkdirs()

    val yaml = Thread.currentThread().contextClassLoader
        .getResourceAsStream("projects.yaml")!!
        .bufferedReader()
        .readText()

    val projects = Yaml.default.decodeFromString(Projects.serializer(), yaml)

    val html = generateHtml(projects)
    File(outputDir, "index.html").writeText(html)

    val logosDir = File(outputDir, "logos")
    logosDir.mkdirs()

    for (project in projects.projects) {
        val logoStream = Thread.currentThread().contextClassLoader
            .getResourceAsStream("logos/${project.logo}") ?: continue
        File(logosDir, project.logo).writeBytes(logoStream.readBytes())
    }

    println("Generated site in ${outputDir.absolutePath}")
}
