# Publishing to npm - Complete Guide

## 📋 Prerequisites

1. **npm Account**: Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm CLI**: Already installed with Node.js
3. **Git Repository**: (Optional) Push to GitHub first

## 🚀 Publishing Steps

### 1. Build the Package

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions (.d.ts files)
- Create ES Module and UMD bundles
- Output everything to `dist/` folder

### 2. Test the Build Locally

```bash
# In your component library directory
npm pack
```

This creates a `.tgz` file you can test in another project:

```bash
# In a test project
npm install /path/to/avense-component-library-0.1.0.tgz
```

### 3. Login to npm

```bash
npm login
```

Enter your npm credentials.

### 4. Check Package Files

See what will be published:

```bash
npm publish --dry-run
```

This shows you exactly what files will be included.

### 5. Publish to npm

**For scoped packages (@avense/...):**

```bash
# Public package (free)
npm publish --access public

# Private package (requires paid plan)
npm publish
```

**For non-scoped packages:**

```bash
npm publish
```

## 📦 Package Scope Options

### Option 1: Keep Scoped Package (Recommended)
- Name: `@avense/component-library`
- Pros: Professional, namespace protection, can add more packages
- Cons: Requires `--access public` flag
- Install: `npm install @avense/component-library`

### Option 2: Change to Non-Scoped
Update `package.json`:
```json
{
  "name": "avense-component-library",
  ...
}
```
- Pros: Simpler to publish
- Cons: Name must be globally unique on npm
- Install: `npm install avense-component-library`

## 🔄 Publishing Updates

### 1. Update Version

Follow [Semantic Versioning](https://semver.org/):

```bash
# Patch (0.1.0 → 0.1.1) - Bug fixes
npm version patch

# Minor (0.1.0 → 0.2.0) - New features (backward compatible)
npm version minor

# Major (0.1.0 → 1.0.0) - Breaking changes
npm version major
```

### 2. Update CHANGELOG.md

Document what changed in this version.

### 3. Publish

```bash
npm publish --access public
```

## ✅ Pre-Publish Checklist

- [ ] All tests pass (when you add tests)
- [ ] `npm run build` completes successfully
- [ ] README.md is complete and accurate
- [ ] LICENSE file exists
- [ ] CHANGELOG.md is updated
- [ ] Version number is correct in package.json
- [ ] Repository URL is correct (update if you push to GitHub)
- [ ] Demo/examples are working
- [ ] TypeScript types are generated in dist/

## 🔍 What Gets Published

Based on your `.npmignore`, these files will be published:

✅ **Included:**
- `dist/` - Compiled code and types
- `README.md` - Documentation
- `LICENSE` - License file
- `package.json` - Package metadata
- `CHANGELOG.md` - Version history

❌ **Excluded:**
- `src/` - Source code
- `node_modules/` - Dependencies
- Demo files
- Config files (vite, tailwind, etc.)
- PrimeReact source code

## 🎯 After Publishing

### 1. Test Installation

```bash
# In a new test project
npm install @avense/component-library
```

### 2. Verify Package Page

Visit: `https://www.npmjs.com/package/@avense/component-library`

### 3. Update Documentation

If you have a website or GitHub Pages, add installation instructions.

### 4. Tag Release on GitHub (Optional)

```bash
git tag v0.1.0
git push origin v0.1.0
```

## 🛡️ Best Practices

### Version Naming
- Pre-release: `0.x.x` (breaking changes allowed)
- Stable: `1.0.0+` (follow semver strictly)
- Beta: `1.0.0-beta.1`
- Alpha: `1.0.0-alpha.1`

### Update Frequency
- Patch: Anytime for bug fixes
- Minor: When adding features (monthly/quarterly)
- Major: When making breaking changes (carefully planned)

### Deprecation
If you need to deprecate a version:

```bash
npm deprecate @avense/component-library@0.1.0 "Use version 0.2.0 or higher"
```

### Unpublishing
⚠️ **Cannot unpublish after 24 hours!**

Within 24 hours:
```bash
npm unpublish @avense/component-library@0.1.0
```

## 🚨 Common Issues

### Issue: "Package name too similar to existing package"
**Solution:** Choose a more unique name or use a scope (@yourname/package)

### Issue: "You must verify your email"
**Solution:** Check npm email and verify

### Issue: "You do not have permission to publish"
**Solution:** Make sure you're logged in: `npm whoami`

### Issue: "Package already exists"
**Solution:** The name is taken. Choose a different name.

### Issue: "Cannot publish over existing version"
**Solution:** Bump version: `npm version patch`

## 📊 Monitoring Your Package

### npm Stats
- View downloads: `https://www.npmjs.com/package/@avense/component-library`
- Check on [npm-stat.com](https://npm-stat.com/)

### Update Notifications
Users can check for updates:
```bash
npm outdated @avense/component-library
```

## 🎓 Next Steps After Publishing

1. **Add GitHub Repository** (if not done)
   - Push code to GitHub
   - Update repository URL in package.json
   - Add GitHub badges to README

2. **Create Demo Site**
   - Deploy demo to Vercel/Netlify
   - Add live examples link to README

3. **Add CI/CD**
   - Automated testing
   - Automated publishing on git tags

4. **Community**
   - Add CONTRIBUTING.md
   - Set up issue templates
   - Create discussions/support channels

5. **Marketing**
   - Tweet about it
   - Post on dev.to or Medium
   - Share in React communities

## 📝 Quick Command Reference

```bash
# Build
npm run build

# Test build locally
npm pack

# Login
npm login

# Check files to publish
npm publish --dry-run

# Publish
npm publish --access public

# Update version
npm version patch|minor|major

# Check published package
npm view @avense/component-library

# Check your login
npm whoami
```

---

🎉 **Ready to publish?** Just run `npm run build && npm publish --access public`
