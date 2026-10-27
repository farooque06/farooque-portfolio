import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import './FloatingShapes.css';

// Pre-allocated reusable math helpers (Zero GC)
const _vec3 = new THREE.Vector3();
const _matrix = new THREE.Matrix4();
const _color = new THREE.Color();

// Procedural Live Code Editor Texture Generator (VS Code Dark Modern Theme)
const CODE_PROJECTS = {
  'SchoolBaba.ts': {
    tag: 'TS',
    tabName: 'SchoolBaba.ts',
    lang: 'TypeScript 5.4',
    lines: [
      { num: '01', text: '// Farooque Alam — SchoolBaba Multi-Tenant Architecture', color: '#8b949e' },
      { num: '02', text: 'import { MultiTenantService, JWTAuth } from "@core/security";', color: '#ff7b72' },
      { num: '03', text: 'import { PostgreSQLPool } from "@database/postgres";', color: '#ff7b72' },
      { num: '04', text: '', color: '' },
      { num: '05', text: 'export class SchoolBabaPlatform extends MultiTenantService {', color: '#79c0ff' },
      { num: '06', text: '  private readonly db = new PostgreSQLPool({ max: 20 });', color: '#d2a8ff' },
      { num: '07', text: '', color: '' },
      { num: '08', text: '  @TenantScoped() // Enforce strict school tenant data isolation', color: '#ffa657' },
      { num: '09', text: '  async authenticateUser(schoolId: string, credentials: LoginDTO) {', color: '#7ee787' },
      { num: '10', text: '    const school = await this.db.findUnique({ where: { schoolId } });', color: '#e6edf3' },
      { num: '11', text: '    const token = await JWTAuth.sign({ schoolId, role: "Admin" });', color: '#79c0ff' },
      { num: '12', text: '    return { success: true, token, portal: "dashboard" };', color: '#a5d6ff' },
      { num: '13', text: '  }', color: '#79c0ff' },
      { num: '14', text: '}', color: '#79c0ff' },
    ],
  },
  'SCHITTLY.php': {
    tag: 'PHP',
    tabName: 'SCHITTLY.php',
    lang: 'PHP 8.2 / TYPO3 v12',
    lines: [
      { num: '01', text: '<?php // Nirekha Dot Com — German Client SCHITTLY Project', color: '#8b949e' },
      { num: '02', text: 'declare(strict_types=1);', color: '#ff7b72' },
      { num: '03', text: 'namespace Vendor\\Schittly\\Controller;', color: '#79c0ff' },
      { num: '04', text: '', color: '' },
      { num: '05', text: 'use TYPO3\\CMS\\Extbase\\Mvc\\Controller\\ActionController;', color: '#ff7b72' },
      { num: '06', text: 'use Psr\\Http\\Message\\ResponseInterface;', color: '#ff7b72' },
      { num: '07', text: '', color: '' },
      { num: '08', text: 'class BookingController extends ActionController {', color: '#79c0ff' },
      { num: '09', text: '  public function showScheduleAction(): ResponseInterface {', color: '#7ee787' },
      { num: '10', text: '    $slots = $this->calendarRepo->findAvailableSlots();', color: '#e6edf3' },
      { num: '11', text: '    $this->view->assign("slots", $slots);', color: '#d2a8ff' },
      { num: '12', text: '    return $this->htmlResponse();', color: '#a5d6ff' },
      { num: '13', text: '  }', color: '#79c0ff' },
      { num: '14', text: '}', color: '#79c0ff' },
    ],
  },
  'RestroBaba.ts': {
    tag: 'TS',
    tabName: 'RestroBaba.ts',
    lang: 'React 19 / Node.js',
    lines: [
      { num: '01', text: '// RestroBaba — Restaurant POS & Order Management', color: '#8b949e' },
      { num: '02', text: 'import { WebSocketServer } from "ws";', color: '#ff7b72' },
      { num: '03', text: 'import { KitchenTicket, BillingEngine } from "@restro/core";', color: '#ff7b72' },
      { num: '04', text: '', color: '' },
      { num: '05', text: 'export async function dispatchOrderToKitchen(order: OrderPayload) {', color: '#79c0ff' },
      { num: '06', text: '  const invoice = await BillingEngine.generate(order.items);', color: '#d2a8ff' },
      { num: '07', text: '  const ticket = new KitchenTicket({ table: order.tableId });', color: '#ffa657' },
      { num: '08', text: '  await ticket.printKOT();', color: '#7ee787' },
      { num: '09', text: '  broadcastOrderUpdate(order.id, "COOKING");', color: '#e6edf3' },
      { num: '10', text: '  return { status: 200, invoiceId: invoice.id };', color: '#a5d6ff' },
      { num: '11', text: '}', color: '#79c0ff' },
      { num: '12', text: '', color: '' },
      { num: '13', text: '// Realtime POS sync across kitchen and counters', color: '#8b949e' },
      { num: '14', text: 'export const posSocket = new WebSocketServer({ port: 8080 });', color: '#79c0ff' },
    ],
  },
};

import profileImageSrc from '../assets/profile-casual.jpg';

// Preload developer photo for 3D screen canvas texture
let devPhotoImg = null;
if (typeof window !== 'undefined') {
  devPhotoImg = new Image();
  devPhotoImg.crossOrigin = 'anonymous';
  devPhotoImg.src = profileImageSrc;
}

// Procedural Live Code Editor Texture Generator (VS Code Dark Modern Theme + Farooque Dev PIP)
function generateCodingScreenTexture(fileName = 'SchoolBaba.ts', cursorVisible = true, onImageReady = null) {
  const currentProject = CODE_PROJECTS[fileName] || CODE_PROJECTS['SchoolBaba.ts'];
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const renderCanvas = () => {
    // Background Editor Canvas
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, 1024, 640);

    // Window Title Bar
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, 1024, 44);

    // Window Controls (Red, Yellow, Green)
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath(); ctx.arc(24, 22, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath(); ctx.arc(44, 22, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#27c93f';
    ctx.beginPath(); ctx.arc(64, 22, 6, 0, Math.PI * 2); ctx.fill();

    // Draw 3 Project Tabs
    const fileNames = ['SchoolBaba.ts', 'SCHITTLY.php', 'RestroBaba.ts'];
    let tabX = 90;
    fileNames.forEach((name) => {
      const isActive = name === fileName;
      const tabWidth = 150;

      if (isActive) {
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(tabX, 8, tabWidth, 36);
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(tabX, 42, tabWidth, 2); // Active tab indicator

        ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillStyle = name.endsWith('.php') ? '#93c5fd' : '#58a6ff';
        ctx.fillText(name.endsWith('.php') ? 'PHP' : 'TS', tabX + 12, 31);
        ctx.fillStyle = '#e6edf3';
        ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(name, tabX + 44, 31);
      } else {
        ctx.fillStyle = '#161b22';
        ctx.fillRect(tabX, 8, tabWidth, 36);

        ctx.fillStyle = '#8b949e';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(name, tabX + 24, 31);
      }

      tabX += tabWidth + 4;
    });

    // Sidebar Separator
    ctx.fillStyle = '#21262d';
    ctx.fillRect(0, 44, 1024, 1);
    ctx.fillRect(60, 45, 1, 565);

    // Sidebar Mini Icons
    ctx.fillStyle = '#8b949e';
    ctx.font = '16px monospace';
    ctx.fillText('📁', 20, 80);
    ctx.fillText('🔍', 20, 120);
    ctx.fillText('⚡', 20, 160);
    ctx.fillText('⚙️', 20, 200);

    // Code Lines Area (Left 50% Column, x: 60 to 500)
    let lineY = 82;
    currentProject.lines.forEach((line) => {
      // Line Number
      ctx.font = '13px "Fira Code", monospace';
      ctx.fillStyle = '#484f58';
      ctx.fillText(line.num, 75, lineY);

      // Code Content (Formatted for the left 50% half)
      if (line.text) {
        ctx.fillStyle = line.color;
        const maxChars = 44;
        const displayText = line.text.length > maxChars ? line.text.slice(0, maxChars) + '…' : line.text;
        ctx.fillText(displayText, 105, lineY);
      }
      lineY += 34;
    });

    // Animated Cursor
    if (cursorVisible) {
      ctx.fillStyle = '#00d4ff';
      ctx.fillRect(440, 82 + 34 * 12 - 17, 8, 20);
    }

    // =========================================================================
    // RIGHT 50%: FULL 50% SIZE DEVELOPER PORTRAIT SCREEN (FAROOQUE ALAM)
    // =========================================================================
    const panelX = 512;
    const panelY = 48;
    const panelW = 502;
    const panelH = 556;

    // Outer Panel Background & Rounded Frame
    ctx.fillStyle = '#0d1117';
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 12);
    ctx.fill();

    // Render Farooque's Photo filling the full 50% half of the screen
    if (devPhotoImg && devPhotoImg.complete && devPhotoImg.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(panelX, panelY, panelW, panelH, 12);
      ctx.clip();

      // Aspect ratio cover calculation (focus slightly higher on the face)
      const imgW = devPhotoImg.naturalWidth;
      const imgH = devPhotoImg.naturalHeight;
      const imgRatio = imgW / imgH;
      const targetRatio = panelW / panelH;

      let sWidth, sHeight, sx, sy;
      if (imgRatio > targetRatio) {
        sHeight = imgH;
        sWidth = sHeight * targetRatio;
        sx = (imgW - sWidth) / 2;
        sy = 0;
      } else {
        sWidth = imgW;
        sHeight = sWidth / targetRatio;
        sx = 0;
        sy = (imgH - sHeight) * 0.18; // Keep face well-centered
      }

      ctx.drawImage(devPhotoImg, sx, sy, sWidth, sHeight, panelX, panelY, panelW, panelH);

      // Bottom Dark Gradient Shade for ultra-readable developer information
      const gradBottom = ctx.createLinearGradient(0, panelY + panelH - 180, 0, panelY + panelH);
      gradBottom.addColorStop(0, 'rgba(10, 13, 22, 0)');
      gradBottom.addColorStop(0.35, 'rgba(10, 13, 22, 0.75)');
      gradBottom.addColorStop(1, 'rgba(10, 13, 22, 0.96)');
      ctx.fillStyle = gradBottom;
      ctx.fillRect(panelX, panelY + panelH - 180, panelW, 180);

      // Top subtle vignette gradient
      const gradTop = ctx.createLinearGradient(0, panelY, 0, panelY + 90);
      gradTop.addColorStop(0, 'rgba(10, 13, 22, 0.85)');
      gradTop.addColorStop(1, 'rgba(10, 13, 22, 0)');
      ctx.fillStyle = gradTop;
      ctx.fillRect(panelX, panelY, panelW, 90);

      ctx.restore();
    } else {
      // Elegant placeholder before image loads
      ctx.fillStyle = '#161b26';
      ctx.beginPath();
      ctx.roundRect(panelX, panelY, panelW, panelH, 12);
      ctx.fill();

      ctx.fillStyle = '#00d4ff';
      ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('FAROOQUE ALAM', panelX + 80, panelY + 260);
      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#8b949e';
      ctx.fillText('Loading Full Developer Portrait...', panelX + 110, panelY + 300);
    }

    // Neon Frame Border around the 50% Photo Panel
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.65)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 12);
    ctx.stroke();

    // Top HUD Badges over the photo
    // Left HUD: LIVE DEV PRESENCE
    ctx.fillStyle = 'rgba(13, 17, 23, 0.85)';
    ctx.beginPath();
    ctx.roundRect(panelX + 14, panelY + 14, 250, 34, 17);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(panelX + 30, panelY + 31, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText('LIVE DEV • WORKSTATION', panelX + 44, panelY + 35);

    // Right HUD: 3 YRS EXP
    ctx.fillStyle = 'rgba(13, 17, 23, 0.85)';
    ctx.beginPath();
    ctx.roundRect(panelX + panelW - 114, panelY + 14, 100, 34, 17);
    ctx.fill();
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#4ade80';
    ctx.fillText('3+ Yrs Exp', panelX + panelW - 98, panelY + 35);

    // Bottom Developer Info (Large & Crystal Clear)
    const infoStartY = panelY + panelH - 130;

    // Name & Verified Badge
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Farooque Alam', panelX + 20, infoStartY);

    // Verified checkmark icon
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(panelX + 195, infoStartY - 7, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0a0a0f';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('✓', panelX + 191, infoStartY - 3);

    // Role & Company
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#79c0ff';
    ctx.fillText('Full Stack Developer • Nirekha Dot Com', panelX + 20, infoStartY + 24);

    // Location & Key Client
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#e6edf3';
    ctx.fillText('📍 Kathmandu, Nepal  •  🇩🇪 German Client: SCHITTLY', panelX + 20, infoStartY + 48);

    // Active Tech Stack Strip
    ctx.font = '12px "Fira Code", monospace';
    ctx.fillStyle = '#a5d6ff';
    ctx.fillText(`⚡ File: ${fileName}  •  React, Node, TYPO3, PostgreSQL`, panelX + 20, infoStartY + 72);

    // Status Indicator
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#3fb950';
    ctx.fillText('● Ready for Full-Time & Client Projects', panelX + 20, infoStartY + 95);

    // Bottom Status Bar
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 610, 1024, 30);
    ctx.fillStyle = '#21262d';
    ctx.fillRect(0, 610, 1024, 1);

    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#58a6ff';
    ctx.fillText('⑂ main*', 20, 629);
    ctx.fillStyle = '#8b949e';
    ctx.fillText(currentProject.lang, 100, 629);
    ctx.fillText('UTF-8', 260, 629);
    ctx.fillStyle = '#3fb950';
    ctx.fillText('● Farooque Live (50% Split Screen)', 350, 629);
    ctx.fillStyle = '#a5d6ff';
    ctx.fillText('Kathmandu, Nepal', 680, 629);
    ctx.fillStyle = '#ffa657';
    ctx.fillText('SCHITTLY & SchoolBaba', 860, 629);
  };

  renderCanvas();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  // If photo is still downloading, automatically re-render canvas when image finishes loading
  if (devPhotoImg && !devPhotoImg.complete) {
    devPhotoImg.addEventListener(
      'load',
      () => {
        renderCanvas();
        texture.needsUpdate = true;
        if (onImageReady) onImageReady();
      },
      { once: true }
    );
  }

  return texture;
}

// Procedural Keyboard Layout Texture Generator
function generateKeyboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Keyboard tray background
  ctx.fillStyle = '#121620';
  ctx.fillRect(0, 0, 1024, 420);

  // Key styling
  const rows = 5;
  const startY = 16;
  const keyHeight = 64;
  const gap = 12;

  ctx.fillStyle = '#1c2233';
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
  ctx.lineWidth = 1;

  for (let r = 0; r < rows; r++) {
    const y = startY + r * (keyHeight + gap);
    const cols = r === 4 ? 8 : 14;
    const keyWidth = (1024 - 32 - (cols - 1) * gap) / cols;

    for (let c = 0; c < cols; c++) {
      let x = 16 + c * (keyWidth + gap);
      let w = keyWidth;

      // Special spacebar row
      if (r === 4 && c === 3) {
        w = keyWidth * 3.5;
      } else if (r === 4 && c > 3) {
        x += keyWidth * 2.5;
      }

      // Draw Key with rounded chiclet rect
      ctx.fillStyle = '#181e2e';
      ctx.beginPath();
      ctx.roundRect(x, y, w, keyHeight, 6);
      ctx.fill();
      ctx.stroke();

      // Subtle key label glow
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '11px sans-serif';
      ctx.fillText('•', x + w / 2 - 3, y + keyHeight / 2 + 4);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Contact Shadow Texture
function generateContactShadow() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
  grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

const FloatingShapes = () => {
  const containerRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [finishColor, setFinishColor] = useState('spacegray'); // 'spacegray' | 'midnight' | 'silver'
  const [activeFile, setActiveFile] = useState('SchoolBaba.ts'); // 'SchoolBaba.ts' | 'SCHITTLY.php' | 'RestroBaba.ts'

  // Mutable refs for smooth 60fps loop
  const stateRef = useRef({
    isInteractive: false,
    finishColor: 'spacegray',
    activeFile: 'SchoolBaba.ts',
    targetRotX: 0,
    targetRotY: 0,
    currRotX: 0,
    currRotY: 0,
    scrollY: 0,
  });

  useEffect(() => {
    stateRef.current.isInteractive = isInteractive;
  }, [isInteractive]);

  useEffect(() => {
    stateRef.current.finishColor = finishColor;
  }, [finishColor]);

  useEffect(() => {
    stateRef.current.activeFile = activeFile;
  }, [activeFile]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Software WebGL Probe
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Three.js PBR Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#0a0a0f', 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 0.8, 7.8);

    // 4. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight('#e0f2fe', 2.8);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0004;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight('#38bdf8', '#070a13', 0.8);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight('#818cf8', 2.0, 15);
    rimLight.position.set(-6, -1, -4);
    scene.add(rimLight);

    // 6. Assemble Composite 10-Part Procedural 3D Laptop
    const laptopGroup = new THREE.Group();
    const isDesktop = window.innerWidth > 1024;
    // Position comfortably to the right on desktop to leave hero text pristine
    laptopGroup.position.set(isDesktop ? 2.4 : 0, -0.1, 0);
    laptopGroup.rotation.set(0.2, -0.35, 0); // Natural 3D isometric presentation angle
    scene.add(laptopGroup);

    // Procedural Textures
    const codingTextures = {
      'SchoolBaba.ts': generateCodingScreenTexture('SchoolBaba.ts', true),
      'SCHITTLY.php': generateCodingScreenTexture('SCHITTLY.php', true),
      'RestroBaba.ts': generateCodingScreenTexture('RestroBaba.ts', true),
    };
    const keyboardTexture = generateKeyboardTexture();
    const shadowTexture = generateContactShadow();

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    Object.values(codingTextures).forEach((tex) => {
      tex.anisotropy = maxAniso;
    });
    keyboardTexture.anisotropy = maxAniso;

    // Materials (Varying roughness/metalness across parts per skill)
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: '#1e2433', // Space gray default
      metalness: 0.88,
      roughness: 0.22,
    });

    const bezelMaterial = new THREE.MeshStandardMaterial({
      color: '#080a10',
      metalness: 0.5,
      roughness: 0.6,
    });

    const trackpadMaterial = new THREE.MeshStandardMaterial({
      color: '#1a2030',
      metalness: 0.2,
      roughness: 0.35,
    });

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: codingTextures['SchoolBaba.ts'],
    });

    // Part 1: Lower Chassis (Base Unibody)
    const baseWidth = 3.2;
    const baseHeight = 0.12;
    const baseDepth = 2.2;
    const baseGeo = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
    baseMesh.castShadow = !isSoftwareGl;
    baseMesh.receiveShadow = !isSoftwareGl;
    laptopGroup.add(baseMesh);

    // Part 2: Keyboard Recess Inset & Backlit Keyboard Bed
    const keybedGeo = new THREE.PlaneGeometry(2.8, 1.25);
    const keybedMat = new THREE.MeshStandardMaterial({
      map: keyboardTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    const keybedMesh = new THREE.Mesh(keybedGeo, keybedMat);
    keybedMesh.rotation.x = -Math.PI / 2;
    keybedMesh.position.set(0, baseHeight / 2 + 0.002, -0.2);
    laptopGroup.add(keybedMesh);

    // Part 3: Precision Glass Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(1.0, 0.65);
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMaterial);
    trackpadMesh.rotation.x = -Math.PI / 2;
    trackpadMesh.position.set(0, baseHeight / 2 + 0.002, 0.68);
    laptopGroup.add(trackpadMesh);

    // Part 4: Display Hinge Cylinder
    const hingeGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.7, 16);
    const hingeMat = new THREE.MeshStandardMaterial({
      color: '#0e121a',
      metalness: 0.95,
      roughness: 0.15,
    });
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.rotation.z = Math.PI / 2;
    hingeMesh.position.set(0, baseHeight / 2 + 0.035, -baseDepth / 2 + 0.05);
    laptopGroup.add(hingeMesh);

    // Part 5: Display Lid Pivot & Aluminum Back Lid
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, baseHeight / 2 + 0.035, -baseDepth / 2 + 0.05);
    lidPivot.rotation.x = -Math.PI * 0.38; // Elegant 112-degree open angle
    laptopGroup.add(lidPivot);

    const lidHeight = 2.15;
    const lidThickness = 0.08;
    const lidGeo = new THREE.BoxGeometry(baseWidth, lidHeight, lidThickness);
    const lidMesh = new THREE.Mesh(lidGeo, aluminumMaterial);
    lidMesh.position.set(0, lidHeight / 2, 0);
    lidMesh.castShadow = !isSoftwareGl;
    lidPivot.add(lidMesh);

    // Part 6: Display Glass Bezel & Top Webcam Dot
    const bezelGeo = new THREE.PlaneGeometry(baseWidth - 0.08, lidHeight - 0.08);
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMaterial);
    bezelMesh.position.set(0, lidHeight / 2, lidThickness / 2 + 0.001);
    lidPivot.add(bezelMesh);

    // Webcam Dot
    const camGeo = new THREE.CircleGeometry(0.015, 12);
    const camMat = new THREE.MeshBasicMaterial({ color: '#22d3ee' });
    const camMesh = new THREE.Mesh(camGeo, camMat);
    camMesh.position.set(0, lidHeight - 0.07, lidThickness / 2 + 0.003);
    lidPivot.add(camMesh);

    // Part 7: Live Coding Display Screen (VS Code Editor)
    const screenGeo = new THREE.PlaneGeometry(baseWidth - 0.22, lidHeight - 0.22);
    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    screenMesh.position.set(0, lidHeight / 2 - 0.03, lidThickness / 2 + 0.002);
    lidPivot.add(screenMesh);

    // Part 8: Screen Emissive Point Light (Illuminating the keyboard subtly)
    const screenGlowLight = new THREE.PointLight('#38bdf8', 1.8, 4.5);
    screenGlowLight.position.set(0, lidHeight / 2, lidThickness / 2 + 0.35);
    lidPivot.add(screenGlowLight);

    // Part 9: Grounding Contact Radial Shadow
    const shadowGeo = new THREE.PlaneGeometry(5.2, 4.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -baseHeight / 2 - 0.01;
    laptopGroup.add(shadowMesh);

    // Part 10: 4 Rubber Base Feet
    const footGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16);
    const footMat = new THREE.MeshBasicMaterial({ color: '#090c12' });
    [
      [-baseWidth / 2 + 0.25, baseDepth / 2 - 0.25],
      [baseWidth / 2 - 0.25, baseDepth / 2 - 0.25],
      [-baseWidth / 2 + 0.25, -baseDepth / 2 + 0.25],
      [baseWidth / 2 - 0.25, -baseDepth / 2 + 0.25],
    ].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(fx, -baseHeight / 2 - 0.01, fz);
      laptopGroup.add(foot);
    });

    // Part 11: 4 Floating Tech Badges (React, Next.js, Node.js, PostgreSQL)
    const floatingBadges = [];
    const techBadges = [
      { symbol: '⚛️', color: '#61dafb', x: -2.0, y: 1.2, z: 0.2, speed: 0.9 },
      { symbol: '▲', color: '#ffffff', x: 2.1, y: 1.5, z: -0.4, speed: 1.1 },
      { symbol: '🟢', color: '#22c55e', x: 2.2, y: -0.4, z: 0.8, speed: 0.8 },
      { symbol: '🐘', color: '#38bdf8', x: -2.1, y: -0.2, z: 0.6, speed: 1.2 },
    ];

    techBadges.forEach((t) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 128;
      bCanvas.height = 128;
      const bCtx = bCanvas.getContext('2d');
      if (bCtx) {
        bCtx.fillStyle = 'rgba(18, 22, 34, 0.85)';
        bCtx.beginPath();
        bCtx.arc(64, 64, 58, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.strokeStyle = t.color;
        bCtx.lineWidth = 4;
        bCtx.stroke();
        bCtx.font = '54px sans-serif';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillText(t.symbol, 64, 68);
      }
      const bTex = new THREE.CanvasTexture(bCanvas);
      bTex.colorSpace = THREE.SRGBColorSpace;
      const bMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.55, 0.55),
        new THREE.MeshBasicMaterial({ map: bTex, transparent: true, opacity: 0.9 })
      );
      bMesh.position.set(t.x, t.y, t.z);
      laptopGroup.add(bMesh);
      floatingBadges.push({ mesh: bMesh, basePos: { ...t } });
    });

    // 7. Background 70 Instanced Floating Micro-Nodes
    const particleCount = 70;
    const particleGeo = new THREE.SphereGeometry(0.022, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({ color: '#38bdf8' });
    const instancedParticles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);

    const particlePositions = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8 - 1.5;
      _vec3.set(x, y, z);
      _matrix.setPosition(_vec3);
      instancedParticles.setMatrixAt(i, _matrix);

      _color.set(i % 3 === 0 ? '#38bdf8' : i % 2 === 0 ? '#818cf8' : '#22c55e');
      instancedParticles.setColorAt(i, _color);

      particlePositions.push({ x, y, z, speed: 0.15 + Math.random() * 0.25 });
    }
    instancedParticles.instanceMatrix.needsUpdate = true;
    instancedParticles.computeBoundingSphere();
    scene.add(instancedParticles);

    // 8. Pointer Movement & Scroll Tracking with Exponential Damping
    const handlePointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetRotY = nx * 0.45;
      stateRef.current.targetRotX = ny * 0.3;
    };

    const handleScroll = () => {
      stateRef.current.scrollY = window.scrollY;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const desktop = window.innerWidth > 1024;
      laptopGroup.position.x = desktop ? 2.4 : 0;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 9. Damped 60fps Animation Loop (Using afterDraw for software WebGL guard)
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb) {
      const gl = renderer.getContext();
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Exponential damping (1 - Math.exp(-k * dt))
      const dampFactor = 1 - Math.exp(-3.5 * dt);
      stateRef.current.currRotY += (stateRef.current.targetRotY - stateRef.current.currRotY) * dampFactor;
      stateRef.current.currRotX += (stateRef.current.targetRotX - stateRef.current.currRotX) * dampFactor;

      // Base rotation + subtle floating hover physics
      const baseIsoY = -0.35;
      const baseIsoX = 0.2;
      laptopGroup.rotation.y = baseIsoY + Math.sin(time * 0.4) * 0.08 + stateRef.current.currRotY;
      laptopGroup.rotation.x = baseIsoX + Math.cos(time * 0.3) * 0.05 + stateRef.current.currRotX * 0.6;

      // Vertical drift reacting gracefully to scroll
      const scrollOffset = (stateRef.current.scrollY * 0.0008) % 3;
      laptopGroup.position.y = -0.1 - scrollOffset * 0.25 + Math.sin(time * 1.2) * 0.04;

      // Gentle breathing screen glow
      screenGlowLight.intensity = 1.6 + Math.sin(time * 2.5) * 0.3;

      // Floating tech badges orbital bobbing
      floatingBadges.forEach((b, idx) => {
        const bp = b.basePos;
        b.mesh.position.y = bp.y + Math.sin(time * bp.speed + idx) * 0.08;
        b.mesh.position.x = bp.x + Math.cos(time * bp.speed * 0.8 + idx) * 0.04;
        b.mesh.rotation.y = Math.sin(time * 0.8 + idx) * 0.15;
      });

      // Subtle particle drift
      for (let i = 0; i < particleCount; i++) {
        const p = particlePositions[i];
        p.y += Math.sin(time * p.speed + i) * 0.0012;
        _vec3.set(p.x, p.y, p.z);
        _matrix.setPosition(_vec3);
        instancedParticles.setMatrixAt(i, _matrix);
      }
      instancedParticles.instanceMatrix.needsUpdate = true;

      // Update screen code editor texture if active project file changed
      const desiredFile = stateRef.current.activeFile;
      const desiredTexture = codingTextures[desiredFile] || codingTextures['SchoolBaba.ts'];
      if (screenMaterial.map !== desiredTexture) {
        screenMaterial.map = desiredTexture;
        screenMaterial.needsUpdate = true;
      }

      // Update finish colors
      const finish = stateRef.current.finishColor;
      if (finish === 'spacegray') {
        aluminumMaterial.color.set('#1e2433');
        aluminumMaterial.metalness = 0.88;
        aluminumMaterial.roughness = 0.22;
      } else if (finish === 'midnight') {
        aluminumMaterial.color.set('#0b0e17');
        aluminumMaterial.metalness = 0.94;
        aluminumMaterial.roughness = 0.18;
      } else if (finish === 'silver') {
        aluminumMaterial.color.set('#d1d5db');
        aluminumMaterial.metalness = 0.92;
        aluminumMaterial.roughness = 0.15;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
      }
      baseGeo.dispose();
      keybedGeo.dispose();
      trackpadGeo.dispose();
      hingeGeo.dispose();
      lidGeo.dispose();
      bezelGeo.dispose();
      screenGeo.dispose();
      shadowGeo.dispose();
      footGeo.dispose();
      particleGeo.dispose();
      aluminumMaterial.dispose();
      bezelMaterial.dispose();
      trackpadMaterial.dispose();
      screenMaterial.dispose();
      keybedMat.dispose();
      shadowMat.dispose();
      footMat.dispose();
      particleMat.dispose();
      Object.values(codingTextures).forEach((t) => t.dispose());
      keyboardTexture.dispose();
      shadowTexture.dispose();
      renderer.dispose();
      if (container && renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className={`farooque-3d-canvas-mount ${isInteractive ? 'interactive' : ''}`}
      />

      {/* Discreet 3D Laptop Studio Controls */}
      <div className="farooque-3d-discreet-control">
        {!isDockOpen ? (
          <button
            type="button"
            className="discreet-pill-btn"
            onClick={() => setIsDockOpen(true)}
            title="3D Developer Laptop Controls"
          >
            <span className="discreet-icon">💻</span>
            <span>3D Laptop Studio</span>
          </button>
        ) : (
          <div className="discreet-expanded-dock glass-card">
            <div className="dock-row-title">
              <span className="dock-title-text">Developer Laptop</span>
              <button
                type="button"
                className="dock-close-mini"
                onClick={() => setIsDockOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="dock-options-group">
              <span className="dock-mini-label">Code:</span>
              <button
                type="button"
                className={`dock-mini-chip ${activeFile === 'SchoolBaba.ts' ? 'active' : ''}`}
                onClick={() => setActiveFile('SchoolBaba.ts')}
              >
                SchoolBaba.ts
              </button>
              <button
                type="button"
                className={`dock-mini-chip ${activeFile === 'SCHITTLY.php' ? 'active' : ''}`}
                onClick={() => setActiveFile('SCHITTLY.php')}
              >
                SCHITTLY.php
              </button>
              <button
                type="button"
                className={`dock-mini-chip ${activeFile === 'RestroBaba.ts' ? 'active' : ''}`}
                onClick={() => setActiveFile('RestroBaba.ts')}
              >
                RestroBaba.ts
              </button>
            </div>

            <div className="dock-options-group">
              <span className="dock-mini-label">Finish:</span>
              <button
                type="button"
                className={`dock-mini-chip ${finishColor === 'spacegray' ? 'active' : ''}`}
                onClick={() => setFinishColor('spacegray')}
              >
                Space Gray
              </button>
              <button
                type="button"
                className={`dock-mini-chip ${finishColor === 'midnight' ? 'active' : ''}`}
                onClick={() => setFinishColor('midnight')}
              >
                Midnight
              </button>
              <button
                type="button"
                className={`dock-mini-chip ${finishColor === 'silver' ? 'active' : ''}`}
                onClick={() => setFinishColor('silver')}
              >
                Silver
              </button>
            </div>

            <div className="dock-options-group">
              <span className="dock-mini-label">Camera:</span>
              <button
                type="button"
                className={`dock-mini-chip ${isInteractive ? 'active' : ''}`}
                onClick={() => setIsInteractive(!isInteractive)}
              >
                {isInteractive ? 'Orbit Mode' : 'Ambient Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingShapes;
