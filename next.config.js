/*
 * next.config.js
 *
 * [보안 조치] Next.js Image Optimization API 취약점 대응 (CVE-2021-39178 / CVE-2022-23646)
 *   - Next.js 12.3.7 로 업그레이드하여 취약점을 코드 레벨에서 근본 해소 (React 17 호환 유지).
 *   - 심층 방어로 아래 설정을 함께 유지한다.
 *       1) images.domains(외부 이미지 화이트리스트) 미설정 → 로컬 이미지만 최적화, 외부 호스트 원격 fetch 차단
 *       2) 보안 응답 헤더(nosniff / X-Frame-Options / Referrer-Policy) 및 /_next/image CSP
 *
 * 참고) 과거의 withCSS/withImages/CKEditor 웹팩 설정 블록은 다중 module.exports 재할당으로
 *       실제로는 적용되지 않던 죽은 코드였으며 webpack5(Next 12)와 비호환이라 제거하였다.
 *       (CKEditor 는 public/assets/ckeditor.js 프리빌드 번들을 <script> 로 로드하므로 웹팩 처리 불필요,
 *        이미지도 로컬 /public 경로 문자열만 사용하여 next-images 불필요)
 */
module.exports = {
    images: {
        // domains 미설정(보안): 외부 호스트 원격 fetch 차단, 로컬 이미지만 최적화
    },
    async headers() {
        // 전역 보안 헤더 (콘텐츠 스니핑 / 클릭재킹 / 레퍼러 유출 방지)
        const securityHeaders = [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ]
        return [
            // '/:path*' 는 하위 경로만 매칭되어 인덱스('/')에는 적용되지 않으므로 '/' 를 별도 지정
            { source: '/', headers: securityHeaders },
            { source: '/:path*', headers: securityHeaders },
            {
                // 이미지 최적화 응답 강화: 콘텐츠 타입 스니핑/화면 위·변조 방지
                source: '/_next/image',
                headers: [
                    { key: 'Content-Security-Policy', value: "script-src 'none'; sandbox;" },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                ],
            },
        ]
    },
}
