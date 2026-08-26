import React from 'react';
import {AbsoluteFill, Composition, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const BG = '#07090d';
const MUTED = '#8b93a5';
const WHITE = '#f7f8fb';
const GREEN = '#5ee6a8';

const ease = (n: number) => 1 - Math.pow(1 - n, 3);

const Fade: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = from * fps;
  const end = to * fps;
  const fade = Math.min(14, Math.max(1, (end - start) / 5));
  const opacity = interpolate(frame, [start, start + fade, end - fade, end], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', inset: 0, opacity}}>{children}</div>;
};

const Pill = ({children}: {children: React.ReactNode}) => (
  <div style={{display: 'inline-flex', padding: '12px 20px', border: '1px solid rgba(255,255,255,.12)', borderRadius: 999, color: MUTED, fontSize: 24, letterSpacing: 1}}>{children}</div>
);

const Invoice = ({x, y, amount, status, delay}: {x: number; y: number; amount: string; status: string; delay: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 120}});
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 650, height: 170, transform: `translateY(${interpolate(p, [0,1], [70,0])}px) scale(${interpolate(p,[0,1],[.94,1])})`, opacity: p}}>
      <div style={{height: '100%', padding: 28, borderRadius: 28, background: 'rgba(20,24,34,.88)', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 24px 70px rgba(0,0,0,.28)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
          <div style={{fontSize: 23, color: MUTED, marginBottom: 12}}>INVOICE • {amount}</div>
          <div style={{fontSize: 30, fontWeight: 650, color: WHITE}}>{status}</div>
        </div>
        <div style={{width: 18, height: 18, borderRadius: 50, background: status === 'OVERDUE' ? '#ff6b6b' : '#f4c95d', boxShadow: `0 0 28px ${status === 'OVERDUE' ? 'rgba(255,107,107,.45)' : 'rgba(244,201,93,.35)'}`}} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const glow = interpolate(Math.sin(frame / 18), [-1, 1], [0.18, 0.42]);
  const titleIn = spring({frame, fps, config: {damping: 18, stiffness: 100}});
  const money = interpolate(ease(Math.max(0, Math.min(1, (t - 5.5) / 1.2))), [0,1], [0, 327000]);
  const cash = interpolate(ease(Math.max(0, Math.min(1, (t - 12.5) / 1.1))), [0,1], [0, 327000]);

  return (
    <AbsoluteFill style={{background: BG, color: WHITE, fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden'}}>
      <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 50% 15%, rgba(94,230,168,.12), transparent 35%), radial-gradient(circle at 10% 90%, rgba(94,230,168,.06), transparent 30%)'}} />
      <div style={{position:'absolute', width:900, height:900, borderRadius:'50%', background:`rgba(94,230,168,${glow*.16})`, filter:'blur(100px)', left:-250, top:500}} />

      {t < 4.7 && <Fade from={0} to={4.7}>
        <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:80}}>
          <Pill>THE CASH FLOW PROBLEM</Pill>
          <div style={{fontSize:88, lineHeight:1.02, fontWeight:800, marginTop:34, letterSpacing:-3, transform:`translateY(${interpolate(titleIn,[0,1],[30,0])}px)`}}>
            REVENUE IS NOT<br/><span style={{color:GREEN}}>CASH.</span>
          </div>
          <div style={{marginTop:28, fontSize:28, color:MUTED, maxWidth:800}}>The money can already be earned — and still not be in the bank.</div>
        </div>
      </Fade>}

      {t >= 4.0 && t < 10.2 && <Fade from={4.1} to={10.2}>
        <div style={{height:'100%', position:'relative'}}>
          <div style={{position:'absolute', left:72, top:110, fontSize:30, color:MUTED}}>REVENUE</div>
          <div style={{position:'absolute', left:72, top:155, fontSize:86, fontWeight:800, letterSpacing:-3}}>$1,000,000</div>
          <Invoice x={72} y={340} amount="$120,000" status="30 DAYS OUTSTANDING" delay={fps*.15}/>
          <Invoice x={72} y={535} amount="$87,000" status="60 DAYS OUTSTANDING" delay={fps*.55}/>
          <Invoice x={72} y={730} amount="$120,000" status="OVERDUE" delay={fps*.95}/>
          <div style={{position:'absolute', right:72, top:145, width:350, textAlign:'right'}}>
            <div style={{fontSize:25, color:MUTED}}>OUTSTANDING AR</div>
            <div style={{fontSize:70, fontWeight:800, color:'#ff8585', marginTop:8}}>${Math.round(money).toLocaleString()}</div>
            <div style={{fontSize:25, color:MUTED, marginTop:10}}>sitting outside your bank</div>
          </div>
        </div>
      </Fade>}

      {t >= 9.5 && t < 14.0 && <Fade from={9.6} to={14.0}>
        <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:70}}>
          <div style={{fontSize:32, color:MUTED, letterSpacing:2}}>YOU DON'T ALWAYS NEED MORE SALES.</div>
          <div style={{fontSize:74, lineHeight:1.06, fontWeight:800, marginTop:28, letterSpacing:-2}}>Sometimes you need to<br/><span style={{color:GREEN}}>COLLECT WHAT YOU SOLD.</span></div>
        </div>
      </Fade>}

      {t >= 13.4 && t < 17.0 && <Fade from={13.5} to={17.0}>
        <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <div style={{fontSize:28, color:MUTED, letterSpacing:3}}>FROM OUTSTANDING</div>
          <div style={{fontSize:94, fontWeight:850, color:GREEN, marginTop:12}}>${Math.round(cash).toLocaleString()}</div>
          <div style={{fontSize:38, marginTop:16}}>→ predictable cash flow</div>
          <div style={{marginTop:32, width:520, height:12, background:'rgba(255,255,255,.08)', borderRadius:99, overflow:'hidden'}}>
            <div style={{height:'100%', width:`${Math.min(100, cash/327000*100)}%`, background:GREEN, boxShadow:'0 0 28px rgba(94,230,168,.55)', borderRadius:99}} />
          </div>
        </div>
      </Fade>}

      {t >= 16.3 && <Fade from={16.4} to={20}>
        <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
          <div style={{fontSize:110, fontWeight:900, letterSpacing:-5}}>RECIFY</div>
          <div style={{fontSize:32, color:MUTED, marginTop:22}}>Turn outstanding invoices into predictable cash flow.</div>
          <div style={{marginTop:42, padding:'16px 30px', borderRadius:999, background:GREEN, color:'#06110b', fontSize:24, fontWeight:800}}>CASH FLOW &gt; REVENUE</div>
        </div>
      </Fade>}

      <div style={{position:'absolute', left:42, bottom:30, fontSize:18, color:'rgba(255,255,255,.35)', letterSpacing:2}}>RECIFY • REVENUE RECOVERY</div>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <Composition id="RecifyMarketing" component={App} durationInFrames={20 * 30} fps={30} width={1080} height={1920} defaultProps={{}} />
);
