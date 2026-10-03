---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<style>
  .cv-hero-desc {
    text-align: left;
    color: #555;
    font-size: 0.88em;
    margin-top: 0;
    margin-bottom: 1.5em;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }

  .cv-download-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5em;
    margin-bottom: 2em;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2em;
  }

  .cv-card-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }

  .cv-card-title {
    font-weight: 600;
    font-size: 1.05em;
    color: #1a1a2e;
  }

  .cv-card-meta {
    font-size: 0.82em;
    color: #888;
  }

  .cv-card-right {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    align-items: flex-end;
  }

  .cv-download-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.6em 1.2em;
    background: #f0f0f0;
    color: #1a1a2e;
    text-decoration: none;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .cv-download-btn:hover {
    background: #e8e8e8;
    border-color: #d0d0d0;
    text-decoration: underline;
  }

  .cv-download-btn i {
    font-size: 0.9em;
  }

  .cv-card-meta-updated {
    display: none;
  }

  .cv-card-meta-updated.show {
    display: inline;
  }

  .cv-embed-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 2em;
    background: #f9f9f9;
  }

  .cv-embed-wrapper {
    width: 100%;
    height: 85vh;
  }

  .cv-embed-wrapper object,
  .cv-embed-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .cv-no-preview {
    padding: 2em;
    text-align: center;
    color: #888;
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    .cv-download-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 1em;
    }

    .cv-card-right {
      align-items: flex-start;
      width: 100%;
    }

    .cv-download-btn {
      width: 100%;
      justify-content: center;
    }

    .cv-embed-container {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .cv-download-card {
      padding: 1em;
    }

    .cv-card-title {
      font-size: 0.95em;
    }

    .cv-download-btn {
      padding: 0.5em 1em;
      font-size: 0.85em;
    }
  }
</style>

<p class="cv-hero-desc">My full curriculum vitae, including positions, publications, teaching, and professional service.</p>

{% assign cv_file = '/files/Tanja_Kojic_CV.pdf' | relative_url %}

<div class="cv-download-card">
  <div class="cv-card-left">
    <div class="cv-card-title">Curriculum Vitae</div>
    <div class="cv-card-meta">PDF{% if site.cv_updated %}<span class="cv-card-meta-updated show"> · Last updated {{ site.cv_updated }}</span>{% endif %}</div>
  </div>
  <div class="cv-card-right">
    <a href="{{ cv_file }}" download class="cv-download-btn">
      <i class="fas fa-download"></i>
      Download PDF
    </a>
  </div>
</div>

{% if site.static_files %}
  {% assign cv_exists = false %}
  {% for file in site.static_files %}
    {% if file.path == '/files/Tanja_Kojic_CV.pdf' %}
      {% assign cv_exists = true %}
    {% endif %}
  {% endfor %}
  {% if cv_exists %}
  <div class="cv-embed-container">
    <div class="cv-embed-wrapper">
      <object data="{{ cv_file }}" type="application/pdf">
        <iframe src="{{ cv_file }}" width="100%" height="100%"></iframe>
      </object>
    </div>
  </div>
  {% endif %}
{% endif %}
