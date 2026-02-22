package io.heapy.kotrol

import com.charleskorn.kaml.Yaml
import io.heapy.kotrol.model.Projects
import java.io.BufferedReader
import java.io.File
import java.io.InputStream

fun main() {
    val outputDir = File("build/site")
    val logosDir = File(outputDir, "logos")
    outputDir.mkdirs()
    logosDir.mkdirs()

    val yaml = readResourceStream("projects.yaml")
        .bufferedReader()
        .use(BufferedReader::readText)

    val projects = Yaml.default.decodeFromString(Projects.serializer(), yaml)

    val html = generateHtml(projects)
    File(outputDir, "index.html").writeText(html)

    for (project in projects.projects) {
        val logoBytes = readResourceStream("logos/${project.logo}")
            .use(InputStream::readBytes)
        File(logosDir, project.logo).writeBytes(logoBytes)
    }

    println("Generated site in ${outputDir.absolutePath}")
}

private fun readResourceStream(path: String): InputStream {
    return Thread.currentThread().contextClassLoader
        .getResourceAsStream(path)
        ?: error("Required resource not found: $path")
}
