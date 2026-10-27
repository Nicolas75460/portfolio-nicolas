import { useEffect, useRef } from 'react';
import type { Orbit } from './data';

export function ScrollProgress() {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(ref.current)ref.current.style.width=`${max>0?scrollY/max*100:0}%`;};
    addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
    return()=>{removeEventListener('scroll',update);removeEventListener('resize',update);};
  },[]);
  return <div ref={ref} className="scroll-progress" aria-hidden="true"/>;
}

export function NetworkCanvas({paused,active}:{paused:boolean;active:Orbit}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const settings=useRef({paused,active});settings.current={paused,active};
  useEffect(()=>{
    const el=canvas.current;if(!el)return;
    const ctx=el.getContext('2d');if(!ctx)return;
    let width=1,height=1,frame=0,rotation=.1,lastTime=0,visible=true,lastStaticFrame='';
    const pointer={x:0,y:0};
    const particles=Array.from({length:760},(_,i)=>{
      const y=1-(i/759)*2,r=Math.sqrt(1-y*y),theta=Math.PI*(3-Math.sqrt(5))*i;
      return {x:Math.cos(theta)*r,y,z:Math.sin(theta)*r,index:i};
    });
    function resize(){const rect=el!.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);el!.width=width*dpr;el!.height=height*dpr;ctx!.setTransform(dpr,0,0,dpr,0,0);}
    const observer=new ResizeObserver(resize);observer.observe(el);resize();
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});intersection.observe(el);
    const move=(event:PointerEvent)=>{const box=el!.getBoundingClientRect();pointer.x=(event.clientX-box.left-width/2)/width;pointer.y=(event.clientY-box.top-height/2)/height;};
    const leave=()=>{pointer.x=0;pointer.y=0;};
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
    function draw(time:number){
      frame=requestAnimationFrame(draw);
      if(time-lastTime<30||!visible||document.hidden)return;
      const elapsed=Math.min(time-lastTime,60);lastTime=time;
      if(!settings.current.paused)rotation+=elapsed*.000055;
      const staticFrame=`${width}:${height}:${settings.current.active}`;
      if(settings.current.paused&&staticFrame===lastStaticFrame)return;
      lastStaticFrame=settings.current.paused?staticFrame:'';
      ctx!.clearRect(0,0,width,height);
      const radius=Math.min(width*.37,height*.36),cx=width*.52,cy=height*.45;
      const tilt=-.23+(settings.current.paused?0:pointer.y*.12),angle=rotation+(settings.current.paused?0:pointer.x*.22);
      const sin=Math.sin(angle),cos=Math.cos(angle),st=Math.sin(tilt),ct=Math.cos(tilt);
      const projected=particles.map(p=>{
        const x=p.x*cos-p.z*sin,z0=p.x*sin+p.z*cos,y=p.y*ct-z0*st,z=p.y*st+z0*ct;
        const perspective=2.8/(2.8-z*.35);
        return {x:cx+x*radius*perspective,y:cy+y*radius*perspective,z,index:p.index};
      });
      // Orbital rings give the network a technical, dimensional frame.
      ctx!.save();ctx!.translate(cx,cy);ctx!.rotate(-.35);ctx!.strokeStyle='#85304444';ctx!.lineWidth=.65;
      ctx!.beginPath();ctx!.ellipse(0,0,radius*1.24,radius*.43,0,0,Math.PI*2);ctx!.stroke();
      ctx!.rotate(1.3);ctx!.strokeStyle='#75334c25';ctx!.beginPath();ctx!.ellipse(0,0,radius*1.13,radius*.5,0,0,Math.PI*2);ctx!.stroke();ctx!.restore();
      const group=settings.current.active==='ai'?0:settings.current.active==='data'?1:2;
      // Draw local connections in three interleaved groups.
      for(let i=0;i<projected.length;i+=3){
        const a=projected[i];if(a.z<-.25)continue;
        for(const delta of [13,21,34]){const b=projected[(i+delta)%projected.length];const distance=Math.hypot(a.x-b.x,a.y-b.y);if(distance>radius*.29||b.z<-.2)continue;
          const alpha=(1-distance/(radius*.29))*(a.index%3===group?.23:.08);
          ctx!.strokeStyle=`rgba(232,61,91,${alpha})`;ctx!.lineWidth=.55;ctx!.beginPath();ctx!.moveTo(a.x,a.y);ctx!.lineTo(b.x,b.y);ctx!.stroke();
        }
      }
      projected.sort((a,b)=>a.z-b.z).forEach(p=>{
        const front=(p.z+1)/2,highlight=p.index%3===group;
        const light=highlight?front*.7+.2:front*.36+.08;
        ctx!.fillStyle=`rgba(${highlight?'255,82,108':'173,46,69'},${light})`;
        ctx!.beginPath();ctx!.arc(p.x,p.y,highlight?(front*1.1+.5):(front*.75+.35),0,Math.PI*2);ctx!.fill();
        if(highlight&&p.index%47===0&&p.z>.1){ctx!.strokeStyle='#fc7d9680';ctx!.lineWidth=.6;ctx!.beginPath();ctx!.arc(p.x,p.y,4,0,Math.PI*2);ctx!.stroke();}
      });
      // Fine concentric rings and crosshairs keep the canvas intentional at rest.
      ctx!.strokeStyle='#8d304345';ctx!.lineWidth=.5;ctx!.beginPath();ctx!.arc(cx,cy,radius*1.08,-1.3,.7);ctx!.stroke();
      for(const [x,y] of [[cx-radius*1.16,cy],[cx+radius*1.16,cy],[cx,cy-radius*1.13]]){ctx!.strokeStyle='#b84d6655';ctx!.beginPath();ctx!.moveTo(x-4,y);ctx!.lineTo(x+4,y);ctx!.moveTo(x,y-4);ctx!.lineTo(x,y+4);ctx!.stroke();}
    }
    frame=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);};
  },[]);
  return <canvas ref={canvas} id="network" aria-hidden="true"/>;
}
