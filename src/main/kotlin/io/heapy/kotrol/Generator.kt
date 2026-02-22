package io.heapy.kotrol

import io.heapy.kotrol.css.CSS
import io.heapy.kotrol.model.Dashboard
import io.heapy.kotrol.model.Project
import kotlinx.html.a
import kotlinx.html.body
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.h2
import kotlinx.html.head
import kotlinx.html.html
import kotlinx.html.img
import kotlinx.html.lang
import kotlinx.html.meta
import kotlinx.html.section
import kotlinx.html.span
import kotlinx.html.stream.createHTML
import kotlinx.html.style
import kotlinx.html.title
import kotlinx.html.unsafe

fun generateHtml(dashboard: Dashboard): String {
    return "<!DOCTYPE html>\n" + createHTML().html {
        lang = "en"
        head {
            meta { charset = "utf-8" }
            meta {
                name = "viewport"
                content = "width=device-width, initial-scale=1"
            }
            title { +"Kotrol — Home Projects" }
            style {
                unsafe {
                    raw(CSS)
                }
            }
        }
        body {
            div("container") {
                h1 { +"Kotrol" }
                for (group in dashboard.groups) {
                    section("group") {
                        h2 { +group.name }
                        div("grid") {
                            for (project in group.projects) {
                                renderProject(project)
                            }
                        }
                    }
                }
            }
        }
    }
}

private fun kotlinx.html.FlowContent.renderProject(project: Project) {
    if (project.links.size == 1) {
        val link = project.links.first()
        a(href = link.url, classes = "card") {
            target = "_blank"
            rel = "noopener noreferrer"
            img(alt = project.title, src = "logos/${project.logo}", classes = "logo")
            span("title") { +project.title }
        }
    } else {
        div("card") {
            img(alt = project.title, src = "logos/${project.logo}", classes = "logo")
            span("title") { +project.title }
            div("links") {
                for (link in project.links) {
                    a(href = link.url, classes = "link-btn") {
                        target = "_blank"
                        rel = "noopener noreferrer"
                        +link.label
                    }
                }
            }
        }
    }
}
